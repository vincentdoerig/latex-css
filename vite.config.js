/** @type {import("vite").UserConfig} */
export default {
  build: {
    cssCodeSplit: true,
    lib: {
      entry: ["style.css", "style-paged.css"],
      formats: ["es"],
      fileName: "index",
    },
  },
};
