import fs from "fs";
import path from "path";
import marked from "marked";
import formatDate from "date-fns/format";
import readingTime from "reading-time";

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, "static/data/posts/");

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text);
  if (href.indexOf("/") === 0) {
    // Do not open internal links on new tab
    return html;
  } else if (href.indexOf("#") === 0) {
    // Handle hash links to internal elements
    const html = linkRenderer.call(renderer, "javascript:;", title, text);
    return html.replace(
      /^<a /,
      `<a class="inner" onclick="document.location.hash='${href.substr(1)}';" `
    );
  }

  return html.replace(
    /^<a /,
    '<a class="outer" target="_blank" rel="nofollow" '
  );
};

// renderer.code = (code, language) => {
//   const parser = prism.languages[language] || prism.languages.html
//   const highlighted = prism.highlight(code, parser, language)
//   return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
// }

marked.setOptions({ headerIds: false, renderer });

const posts = fs.readdirSync(POSTS_DIR).map(fileName => {
  const data = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const fileJson = JSON.parse(data);
  const {
    title,
    content,
    date,
    categories,
    featured,
    image,
    seo,
    references,
    snippet
  } = fileJson;

  const slug = fileName.split(".")[0];
  const html = marked(content);
  const category = categories.toLowerCase();
  const readingStats = readingTime(content);
  const printReadingTime = readingStats.text.replace("read", "");
  const printDate = formatDate(new Date(date), "d LLLL");

  return {
    title,
    seo,
    category,
    references,
    featured,
    image,
    slug,
    html,
    date,
    snippet,
    printDate,
    printReadingTime
  };
});

posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
});

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

export default posts;
