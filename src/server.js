import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
// import { build_dir, src_dir, manifest } from "@sapper/internal/manifest-server";
// import fs from "fs";
// import replace from "replace-in-file";
import "./sitemap.js";
import "./main.css";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// const options = {
//   preload_template: "preload_template.html",
//   sapper_template: "template.html",
//   from: "%sapper.preload%",
//   to: '<link rel="moduleepreload" href="index.js">'
// };

// function preload(req, res, next) {
//   console.log(`~> Received ${req.method} on ${req.url}`);
//   const template = fs.readFileSync();
//   next(); // move on
// }

polka() // You can also use Express
  .use(
    // preload,
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
