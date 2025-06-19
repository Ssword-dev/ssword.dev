import utils from "./webpack-utils.mjs";
export default [
  utils.cleanPluginConfig(),
  ...utils.dualConfig({
    target: "web",
    entry: "src/client.ts",
    outputBasename: "client",
    directive: `"use client";`,
    config: utils.config,
  }),
  ...utils.dualConfig({
    target: "node",
    entry: "src/server.ts",
    outputBasename: "server",
    directive: `"use server";`,
    config: utils.config,
  }),
];
