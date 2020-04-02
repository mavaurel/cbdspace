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

marked.setOptions({ headerIds: false, renderer });

const templateTooltip = /\[Tooltip\](.*)\[Tooltip\]/g;
function markedToHtmlTooltip(text){
  const newText = text.replace(templateTooltip, (match, anchor) => {    
    return `<span class="tooltip__anchor">${anchor}</span>`;
  });
  return newText;
};

const posts = fs.readdirSync(POSTS_DIR).map(fileName => {
  const data = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const {
    title,
    content,
    date,
    // categories,
    featured,
    image,
    seo,
    references,
    snippet, 
    tooltips
  } = JSON.parse(data);

  let html = marked(content);
  html = markedToHtmlTooltip(html);
  const slug = fileName.split(".")[0];  
  //const category = categories.toLowerCase();
  const printReadingTime = readingTime(content).text.replace("read", "");
  const printDate = formatDate(new Date(date), "d LLLL");
  const thumbnail = image.replace("/images/", "images/thumbs/__thumb-");

  return {
    title,
    seo,    
    references,
    tooltips,
    featured,
    image,
    thumbnail,
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
