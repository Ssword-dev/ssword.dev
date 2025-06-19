import _base from "./_webpack.config.json" with { type: "json" };
// read package.json
import _package from "./package.json" with { type: "json" };
import webpack from "webpack";
import { resolve as _resolve } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import AmbienceBrokerPlugin from "./loaders/ambience-broker.js";
import NextDirectivePlugin from "./loaders/next-directive.js";
import EnvPlugin from "./loaders/env.js";

const { externals: _externals, obfuscate } = _base;
const { peerDependencies, dependencies } = _package;
const mangleOptions = () => {
  return Object.fromEntries(
    ["keep_classnames", "keep_fnames", "properties"].map((val) => [
      val,
      {
        builtins: obfuscate.builtins,
        regex: new RegExp(obfuscate.regex),
      },
    ]),
  );
};

const externalDependenciesRegexes = ({ standalone }) => {
  return (_externals || [])
    .filter((entry) => {
      // exclude standalone-only deps when in standalone mode
      return !(entry.standalone && standalone);
    })
    .map((entry) => new RegExp(entry.regex));
};

// enumerates our radix dependencies
const externals = ({ standalone }) => {
  const externals = externalDependenciesRegexes({ standalone });

  const externalDependancies = Object.keys(dependencies).filter(
    // quite literally filter the externals
    (dep) => externals.some((extern) => extern.test(dep)),
  );

  const peerDeps = Object.keys(peerDependencies);
  // merge the peer deps together
  return Object.fromEntries(
    [...externalDependancies, ...peerDeps].map((val) => [val, val]),
  );
};

/**
 *
 * @param {*} param0
 * @returns {import("webpack").Configuration}
 */
const config = ({
  target,
  entry,
  outputBasename,
  directive,
  standalone = false,
}) => ({
  name: standalone ? `${outputBasename}.standalone` : outputBasename,
  entry: _resolve(import.meta.dirname, entry),
  stats: false,
  output: {
    path: _resolve(import.meta.dirname, "dist"),
    filename: standalone
      ? `${outputBasename}.standalone.js`
      : `${outputBasename}.js`,
    library: {
      type: "module",
    },
    module: true,
  },
  mode: "production",
  devtool: "source-map",
  target,
  experiments: {
    outputModule: true,
  },
  externals: function ({ context, request }, callback) {
    const externals = externalDependenciesRegexes({ standalone });

    if (externals.some((extern) => extern.test(request))) {
      return callback(null, request);
    }

    callback();
  },
  externalsType: "module",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": _resolve(import.meta.dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: _resolve(import.meta.dirname, "tsconfig.build.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            module: true,
            ...mangleOptions(),
          },
          keep_classnames: true,
          keep_fnames: true,
          toplevel: true,
          compress: {
            arrows: true,
            booleans: true,
            collapse_vars: true,
            comparisons: true,
            computed_props: true,
            conditionals: true,
            dead_code: true,
            // drop_console: true,
            drop_debugger: true,
            hoist_funs: true,
            hoist_props: true,
            hoist_vars: true,
            if_return: true,
            inline: true,
            join_vars: true,
            loops: true,
            negate_iife: true,
            properties: true,
            pure_getters: true,
            reduce_funcs: true,
            reduce_vars: true,
            switches: true,
            typeofs: true,
            unused: true,
            passes: 3,
            directives: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    concatenateModules: true,
    sideEffects: true,
    usedExports: true,
    splitChunks: false,
    runtimeChunk: false,
    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },
  plugins: [
    new NextDirectivePlugin({ directive }),
    new EnvPlugin({
      BUILD_MODE: process.env.BUILD_MODE ?? "normal",
    }),
    // Be sure to make ambience broker last in the plugin list
    // so it catches all errors!!!
    // But dont worry, the plugin itself wont shut up if you dont (:
    // because i made it like that
    AmbienceBrokerPlugin.default,
  ],
});

/**
 * @param {*} param0
 * @returns {import("webpack").Configuration}
 */
const configWithCodeSplitting = ({
  target,
  entry,
  outputBasename,
  directive,
  standalone = false,
}) => ({
  name: standalone ? `${outputBasename}.standalone` : outputBasename,

  stats: false,
  entry: {
    [outputBasename]: _resolve(import.meta.dirname, entry),
  },

  output: {
    path: _resolve(import.meta.dirname, "dist"),
    filename: `[name]${standalone ? ".standalone" : ""}.js`, // main entry
    chunkFilename: `${outputBasename}.[name].[contenthash].js`, // split chunks
    library: {
      type: "module",
    },
    module: true,
  },
  mode: "production",
  devtool: "source-map",
  target,
  experiments: {
    outputModule: true,
  },
  externals: function ({ context, request }, callback) {
    const externals = externalDependenciesRegexes({ standalone });

    if (externals.some((extern) => extern.test(request))) {
      return callback(null, request);
    }

    callback();
  },
  externalsType: "module",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": _resolve(import.meta.dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: _resolve(import.meta.dirname, "tsconfig.build.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            module: true,
            ...mangleOptions(),
          },
          keep_classnames: true,
          keep_fnames: true,
          toplevel: true,
          compress: {
            arrows: true,
            booleans: true,
            collapse_vars: true,
            comparisons: true,
            computed_props: true,
            conditionals: true,
            dead_code: true,
            drop_debugger: true,
            hoist_funs: true,
            hoist_props: true,
            hoist_vars: true,
            if_return: true,
            inline: true,
            join_vars: true,
            loops: true,
            negate_iife: true,
            properties: true,
            pure_getters: true,
            reduce_funcs: true,
            reduce_vars: true,
            switches: true,
            typeofs: true,
            unused: true,
            passes: 3,
            directives: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    concatenateModules: true,
    sideEffects: true,
    usedExports: true,
    splitChunks: {
      minChunks: 2,
      minSize: 20000,
      maxSize: 25000,
    },
    runtimeChunk: "multiple",
    moduleIds: "deterministic",
    chunkIds: "deterministic",
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
  plugins: [
    new NextDirectivePlugin({ directive }),
    new EnvPlugin({
      BUILD_MODE: process.env.BUILD_MODE ?? "normal",
    }),
    AmbienceBrokerPlugin.default, // Assuming AmbienceBrokerPlugin is correctly imported
  ],
});

const configDev = ({ target, entry, outputBasename, directive }) => {
  const baseDir = import.meta.dirname;

  return {
    name: `${outputBasename}.dev`,
    entry: _resolve(baseDir, entry),
    stats: "errors-warnings",
    output: {
      path: _resolve(baseDir, "dist"),
      filename: `${outputBasename}.js`,
      library: {
        type: "module",
      },
      module: true,
      clean: false,
    },
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    cache: {
      type: "filesystem",
      allowCollectingMemory: true,
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 50,
      poll: 100,
      ignored: /node_modules/,
    },
    target,
    experiments: {
      outputModule: true,
    },
    externals: function ({ request }, callback) {
      // mark all external dependencies (from package.json) as external
      const externals = externalDependenciesRegexes({ standalone: false });
      if (externals.some((regex) => regex.test(request))) {
        return callback(null, request);
      }
      callback();
    },
    externalsType: "module",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "@": _resolve(baseDir, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: _resolve(baseDir, "tsconfig.build.json"),
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: _resolve(baseDir, "tsconfig.build.json"),
        },
      }),
      new NextDirectivePlugin({ directive }),
      new EnvPlugin({
        BUILD_MODE: process.env.BUILD_MODE ?? "dev",
      }),
      AmbienceBrokerPlugin.default,
    ],
  };
};

const dualConfig = ({
  target,
  entry,
  outputBasename,
  directive,
  config = config,
}) => [
  config({ target, entry, outputBasename, directive, standalone: false }),
  config({ target, entry, outputBasename, directive, standalone: true }),
];

/**
 *
 * @returns {webpack.Configuration}
 */
const cleanPluginConfig = () => {
  return {
    // we dont output anything whatsoever
    name: "clean",
    entry: {},
    output: {
      path: _resolve(import.meta.dirname, "dist"),
    },
    mode: "none",
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: ["**/*", "!preserve/**/*"],
      }),
      AmbienceBrokerPlugin.default,
    ],
  };
};

export default {
  mangleOptions,
  externals,
  config,
  configDev,
  configWithCodeSplitting,
  dualConfig,
  cleanPluginConfig,
};
