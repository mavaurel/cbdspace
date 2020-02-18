import fs from "fs";
import posts from "./routes/_posts.js";
import { dev } from "@sapper/internal/manifest-server";

const BASE_URL = "https://cbdspace.io";
const ROUTES_DIR = "src/routes/";
const EXPORT_DIR = dev ? "static/" : "__sapper__/export/";
const pages = [];

fs.readdirSync(ROUTES_DIR).forEach(file => {
  file = file.split(".")[0];
  if (file.charAt(0) !== "_" && file.charAt(0) !== "[" && file !== "index") {
    pages.push(file);
  }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url><loc>${BASE_URL}</loc></url>
    ${pages.map(page => `<url><loc>${BASE_URL}/${page}/</loc></url>`).join("")}
    ${posts
      .map(
        post =>
          `<url>
          <loc>${BASE_URL}/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
    </url>`
      )
      .join("\n")}
  </urlset>`;

fs.writeFile(EXPORT_DIR + "sitemap.xml", sitemap, err => {
  if (err) throw err;
});

export default sitemap;
