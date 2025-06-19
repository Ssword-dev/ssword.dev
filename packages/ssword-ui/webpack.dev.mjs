import utils from "./webpack-utils.mjs";

export default [
  utils.cleanPluginConfig(),
  utils.configDev({
    target: "web",
    entry: "src/client.ts",
    outputBasename: "client",
    directive: `"use client";`,
  }), // We need to rebundle client frequently soo...
];
