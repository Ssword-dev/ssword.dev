import chalk from "chalk";
import { resolve } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

class AmbienceBrokerPlugin {
  constructor() {
    this.name = this.constructor.name;
    try {
      this.config = require(resolve(process.cwd(), "./ambience-broker.config.json"));
    } catch (err) {
      this.config = {};
    }
  }

  ambienceMessage(message, color) {
    if (color) {
      return chalk[color](message);
    }
    return chalk.reset(message);
  }

  time() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return chalk.blueBright(
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(
        now.getMinutes()
      )}:${pad(now.getSeconds())} TZ:${process.env.TZ ?? "no-tz"}`
    );
  }

  hintMessage(message, color) {
    return `${this.time()} ${this.ambienceMessage(`[Hint]:`, "yellow")} ${this.ambienceMessage(message, color)}`;
  }

  hint(message, color, level = "log") {
    if (!["log", "warn", "error"].includes(level)) {
      throw new Error(`Invalid hint level: ${level}`);
    }
    console[level](this.hintMessage(message, color));
  }

  getNthStackLine(error, n = 1) {
    if (!error.stack) return null;
    const lines = error.stack.split("\n").map((line) => line.trim());
    return lines[n + 1] ?? null;
  }

  apply(compiler) {
    const isLastInPluginList = compiler.options.plugins.at(-1) === this;
    if (!isLastInPluginList) {
      this.hint(
        `[AmbienceBrokerPlugin]: Please ensure this plugin is last in the plugins list to catch all errors and warnings.`,
        "yellow"
      );
    }

    compiler.hooks.assetEmitted.tap(this.name, (maybeAPath, info) => {
      this.hint(`${info.targetPath} (${info.content.length} bytes) emitted.`, "green");
    });

    compiler.hooks.done.tap(this.name, (stats) => {
      const statsCompilation = stats.toJson();

      if (stats.hasWarnings()) {
        for (const warning of statsCompilation.warnings) {
          this.hint(
            `[${statsCompilation.name ?? "<unnamed>"}] Warning: ${warning.message}`,
            "yellow",
            "warn"
          );

          const limit = this.config.reports?.["max-error-stack"];
          if (typeof limit !== "number") {
            this.hint(
              "[AmbienceBrokerPlugin]: Invalid max-error-stack value. Error stack trace won't be reported unless fixed.",
              "yellow"
            );
          } else {
            this.hint(`--- Warning Stack Trace (Limit = ${limit}) ---`);
            for (let i = 1; i < limit; i++) {
              const cur = this.getNthStackLine(warning, i);
              if (!cur) break;
              this.hint(cur, "yellow", "warn");
            }
          }
        }
      }

      if (stats.hasErrors()) {
        for (const error of statsCompilation.errors) {
          this.hint(
            `[${statsCompilation.name ?? "<unnamed>"}] Error: ${error.message}`,
            "red",
            "error"
          );

          const limit = this.config.reports?.["max-error-stack"];
          if (typeof limit !== "number") {
            this.hint(
              "[AmbienceBrokerPlugin]: Invalid max-error-stack value. Error stack trace won't be reported unless fixed.",
              "red"
            );
          } else {
            this.hint(`--- Error Stack Trace (Limit = ${limit}) ---`);
            for (let i = 1; i < limit; i++) {
              const cur = this.getNthStackLine(error, i);
              if (!cur) break;
              this.hint(cur, "red", "error");
            }
          }
        }
      }
    });

    compiler.hooks.beforeCompile.tap(this.name, () => {
      this.hint(`-- Externals of Compilation ${compiler.options.name} --`, "blue");
      for (const extern in compiler.options.externals) {
        this.hint(`External ${extern}`);
      }
    });
  }
}

/**
 * A shared instance of ambience broker
 */
AmbienceBrokerPlugin.default = new AmbienceBrokerPlugin();
export default AmbienceBrokerPlugin;
