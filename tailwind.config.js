const thematic = require("./plugins/tailwind/thematic.js");
/**
 * @type {import("tailwindcss").Config}
 */

module.exports = {
  content: ["./src/app/**/*.{js,ts}x?"],
  theme: {
    extend: {
      colors: {
        ...thematic.colors,
      },
      fontSize: {
        ...thematic.fontSize,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), thematic.plugin],
  safelist: [],
};
