import wp from "webpack";
const { DefinePlugin } = wp;
class EnvPlugin extends DefinePlugin {
  constructor(env) {
    super(
      Object.fromEntries(
        Object.keys(env).map((envKey) => [
          `process.env["${envKey}"]`,
          JSON.stringify(env[envKey]),
        ]),
      ),
    );
  }
}

export default EnvPlugin;
