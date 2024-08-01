//import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife", // Immediately Invoked Function Expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    !production &&
      serve({
        open: true,
        contentBase: "public",
        port: 8080,
      }),
    !production && livereload("public"),
    production && terser(),
  ],
};
