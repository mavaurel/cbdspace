module.exports = (purgecss = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer")(),
    // Do not purge the CSS in dev mode to be able to play with classes in the browser dev-tools.
    purgecss &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./**/*.svelte", "./src/template.html"],
        extractors: [
          {
            extractor: require("purgecss-from-svelte"),

            // Specify the file extensions to include when scanning for
            // class names.
            extensions: ["svelte", "html"]
          }
        ],
        // Whitelist selectors to stop Purgecss from removing them from your CSS.
        whitelist: []
      }),
    !purgecss && require("cssnano")
  ].filter(Boolean);
};
