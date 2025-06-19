import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname;
const join = path.join;
const relative = path.relative;
const resolve = path.resolve;
const __dirname = dirname(fileURLToPath(import.meta.url));
/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, "src/**/*.{js,jsx,ts,tsx}")],
  theme: {},
};
