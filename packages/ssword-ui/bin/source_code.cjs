#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const shiki = require("shiki");
const cheerio = require("cheerio");
const { default: stripJsonComments } = require("strip-json-comments");

// config
async function loadConfig() {
  let defaultConfig = {
    "word-wrap": true,
    theme: "github-dark",
  };

  const configPath = path.join(process.cwd(), "sc.config.json");

  try {
    const contents = await fs.promises.readFile(configPath, {
      encoding: "utf-8",
    });
    const stripped = stripJsonComments(contents, { trailingCommas: true });
    return { ...defaultConfig, ...JSON.parse(stripped) };
  } catch (_) {
    // default config
    return defaultConfig;
  }
}

// highlight
async function highlightFile(filePath, highlighter, config) {
  const code = fs.readFileSync(filePath, "utf-8");
  const ext = path.extname(filePath).slice(1) || "txt";

  const lang =
    shiki.BUNDLED_LANGUAGES.find(
      (l) => l.id === ext || l.aliases?.includes(ext),
    )?.id || "txt";

  return highlighter.codeToHtml(code, { theme: config.theme, lang });
}

// postprocess shiki output
async function finalize(shikiOutput, config) {
  if (typeof shikiOutput !== "string") {
    throw new Error(`Invalid Shiki Output: ${typeof shikiOutput}`);
  }

  const $ = cheerio.load(shikiOutput, {}, false);
  const shiki_frame = $("pre.shiki")
    .attr("data-sc-compiled", "true")
    .attr("data-respects-theme", "true");

  if (!shiki_frame.hasClass("shiki-code-pre-block")) {
    shiki_frame.addClass("shiki-code-pre-block");
  }

  if (config["word-wrap"]) {
    const word_wrap_current = shiki_frame.css("word-wrap");
    if (word_wrap_current !== "break-word") {
      shiki_frame.css("word-break", "break-word");
    }
  }

  return shiki_frame.html();
}

// jsx generation
async function template(finalization, config) {
  return `export default function SourceCode() {
  return (
    <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(finalization)} }} />
  );
}
`;
}

// config generation
let prettierConfig = null;
async function getPrettierConfig(config) {
  if (prettierConfig) {
    return prettierConfig;
  }

  if (config.prettier === "resolve") {
    const prettier = require("prettier");
    const $prettierConfig = prettier.resolveConfig(process.cwd());
    prettierConfig = $prettierConfig; // Impure move
    return $prettierConfig;
  }

  return config.prettier;
}

// optional formatting
async function format(templated, config) {
  let prettier;
  try {
    prettier = require("prettier");
  } catch (err) {
    console.warn("Warning: Prettier is not installed, formatting is disabled");
    return templated; // fallback if prettier is missing
  }

  const pcfg = await getPrettierConfig(config);
  return await prettier.format(templated, pcfg);
}

async function processSource(source, highlighter, config) {
  // find the source
  // if we dont find the source, it will error... so might take care of that later
  const initialHighlight = await highlightFile(source, highlighter, config);
  const finalization = await finalize(initialHighlight, config); // apply any finalization to the shiki highlight
  const templated = await template(finalization, config);

  // optional formatting
  const formatted = await format(templated, config);
  return formatted;
}

async function main() {
  const srcDir = process.argv[2];
  const outDir = process.argv[3];
  // Config for this executable
  const config = await loadConfig();
  if (!srcDir || !outDir) {
    console.error("Usage: source_code <source_directory> <output_directory>");
    process.exit(1);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const highlighter = await shiki.getHighlighter({ theme: config.theme });

  const files = fs
    .readdirSync(srcDir)
    .filter((f) => fs.statSync(path.join(srcDir, f)).isFile());

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(srcDir, file);
      const jsxContent = await processSource(filePath, highlighter, config);
      const outFile = path.join(outDir, file + ".jsx");
      fs.writeFileSync(outFile, jsxContent, "utf-8");
      console.log(`Generated: ${outFile}`);
    }),
  );
}

main();
