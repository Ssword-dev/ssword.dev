/**
 * @type {typeof import("tailwindcss/plugin").default}
 */
const plugin = require("tailwindcss/plugin");

module.exports = {
  colors: {
    "primary-fg": "var(--primary-fg)",
    "primary-bg": "var(--primary-bg)",
    "secondary-fg": "var(--secondary-fg)",
    "secondary-bg": "var(--secondary-bg)",
    "tertiary-fg": "var(--tertiary-fg)",
    "tertiary-bg": "var(--tertiary-bg)",
  },

  fontSize: {
    "base-size": "var(--base-text-size)",
    "container-size": "var(--base-container-size)",
  },

  plugin: plugin(function ({ addUtilities }) {
    const levels = ["primary", "secondary", "tertiary"];
    const kind = ["fg", "bg"];

    const textUtilities = Object.fromEntries(
      levels.map((level) => [
        `.text-${level}`,
        {
          color: `var(--${level}-fg)`,
        },
      ]),
    );
    const bgUtilities = Object.fromEntries(
      levels.map((level) => [
        `.bg-${level}`,
        {
          "background-color": `var(--${level}-bg)`,
        },
      ]),
    );
    addUtilities({
      ".font-bold-style": {
        "font-weight": "var(--text-style-bold)",
      },
      ".italic-style": {
        "font-style": "var(--text-style-italic)",
      },
      ...textUtilities,
      ...bgUtilities,
    });
  }),
};
