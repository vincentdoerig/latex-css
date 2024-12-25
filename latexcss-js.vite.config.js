/** @type {import("vite").UserConfig} */
export default {
  build: {
    emptyOutDir: false,
    lib: {
      entry: "./src/index.js",
      formats: ["iife"],
      fileName: "latexcss-paged",
      name: "LatexCss"
    },
  },
};

