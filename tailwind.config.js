import tsh from "tailwind-scrollbar-hide";
import ssword_ui_preset from "@ssword/ui/tw-preset";
/**
 * @type {import("tailwindcss").Config}
 */

export default {
  presets: [ssword_ui_preset],
  content: ["./src/app/**/*.{js,ts}x?"],
  theme: {
    extend: {
      colors: {},
      fontSize: {},
    },
  },
  plugins: [tsh],
  safelist: [],
};
