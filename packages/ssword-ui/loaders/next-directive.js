import wp from "webpack";
const { BannerPlugin, Compilation } = wp;
class NextDirectivePlugin extends BannerPlugin {
  constructor({ directive }) {
    super({
      banner: directive + "\n",
      raw: true,
      // According to the docs, this should run after any minimizer
      // aka terser so...
      // Heyyy, that actually worked... ~~ignore the 5 hours i spent just fixing this~~
      stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
      entryOnly: true,
    });
  }
}

export default NextDirectivePlugin;
