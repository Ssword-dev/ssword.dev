import utils from "./webpack-utils.mjs";

export default [
  utils.cleanPluginConfig(),
  utils.configDev({
    target: "web",
    entry: "src/client.ts",
    outputBasename: "client",
    directive: `"use client";`,
    config: utils.config // dep-injection style makes it very easy to swap out things... just sayin...
  }), // We need to rebundle client frequently soo...
];
