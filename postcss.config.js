module.exports = (purgecss = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("tailwindcss")("./tailwind.config.js"),
    require("postcss-nesting")(),
    require("autoprefixer")(),
    purgecss && require("@fullhuman/postcss-purgecss")({
      content: ["./**/*.html", "./**/*.svelte"],
      whitelist: [],
      whitelistPatterns: [],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
    purgecss && require("cssnano")
  ].filter(Boolean);
};