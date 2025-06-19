import chalk from "chalk";
import { resolve } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// this is a plugin for breaking the silence of the compiler
// because its literally not printing anything
// unless there is an error or compilation is finished
class AmbienceBrokerPlugin {
  constructor() {
    // Reflect the class name
    this.name = this.constructor.name;
    try {
      this.config = require(
        resolve(process.cwd(), "./ambience-broker.config.json"),
      );
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
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
        now.getHours(),
      )}:${pad(now.getMinutes())}:${pad(now.getSeconds())} TZ:${process.env.TZ ?? "no-tz"}`,
    );
  }

  hintMessage(message, color) {
    return (
      `${this.time()}` +
      " " +
      this.ambienceMessage(`[Hint]:`, "yellow") +
      " " +
      this.ambienceMessage(message, color)
    );
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
    // skip the first line (error message), return nth stack trace line
    return lines[n + 1] ?? null;
  }
  /**
   *
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const isLastInPluginList = compiler.options.plugins.at(-1) === this;
    if (!isLastInPluginList) {
      this.hint(
        `[AmbienceBrokerPlugin]: Heyy, please next time put me in last so i can catch all errors and warns, thank you!`,
      );
    }
    compiler.hooks.assetEmitted.tap(this.name, (maybeAPath, info) => {
      this.hint(`${info.targetPath} (${info.content.length} bytes)`, "green");
    });

    compiler.hooks.done.tap(this.name, (stats) => {
      const statsCompilation = stats.toJson();

      if (stats.hasWarnings()) {
        for (const warning of statsCompilation.warnings) {
          this.hint(
            `[${statsCompilation.name ?? "<unnamed>"}] Warn: ${warning.message}`,
            "yellow",
            "warn",
          );

          if (this.config && this.config.reports["max-error-stack"]) {
            const limit = this.config.reports["max-error-stack"];
            if (typeof limit !== "number") {
              this.hint(
                "[AmbienceBrokerPlugin]: Heyy, i noticed you put a max-error-stack that is not a number\nwhich are not valid so... the warning stack wont be reported... unless you make it valid...",
                "warn",
              );
            }
            this.hint(`--- Warning Stack: Limit = ${limit} ---`);
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
            `[${statsCompilation.name ?? "<unnamed>"}] Warn: ${error.message}`,
            "yellow",
            "warn",
          );
          if (this.config && this.config.reports["max-error-stack"]) {
            const limit = this.config.reports["max-error-stack"];
            if (typeof limit !== "number") {
              this.hint(
                "[AmbienceBrokerPlugin]: Heyy, i noticed you put a max-error-stack that is not a number\nwhich are not valid so... the error stack wont be reported... unless you make it valid...",
                "warn",
              );
            }
            this.hint(`--- Error Stack: Limit = ${limit} ---`);
            for (let i = 1; i < limit; i++) {
              const cur = this.getNthStackLine(error, i);
              if (!cur) break;
              this.hint(cur, "yellow", "warn");
            }
          }
        }
      }
    });

    // hook to before compilation to inform us the externals

    compiler.hooks.beforeCompile.tap(this.name, (params) => {
      this.hint(
        `-- Externals of Compilation ${compiler.options.name} --`,
        "blue",
      );
      for (const extern in compiler.options.externals) {
        this.hint(`External ${extern}`);
      }
    });
  }
}

AmbienceBrokerPlugin.default = new AmbienceBrokerPlugin();
export default AmbienceBrokerPlugin;
