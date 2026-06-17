import { readFileSync, writeFileSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, "our-books-live.html"), "utf8");

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(htmlFragment) {
  return decodeHtml(htmlFragment);
}

const postRegex =
  /<div class="pp-post-wrap[^"]*post-(\d+) apps-books[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*(?=<div class="pp-post-wrap|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/g;

const books = [];
let match;

while ((match = postRegex.exec(html)) !== null) {
  const block = match[0];

  const titleMatch = block.match(
    /elementor-hidden-mobile[\s\S]*?<h2 class="elementor-heading-title[^"]*"><a href="[^"]+">([\s\S]*?)<\/a><\/h2>/,
  );
  const moreInfoMatch = block.match(
    /elementor-button-text">More Info<\/span>[\s\S]*?href="([^"]+)"/,
  );
  const buyNowMatch = block.match(
    /elementor-button-text">Buy Now<\/span>[\s\S]*?href="([^"]+)"/,
  );

  const excerptMatch = block.match(/<div class="dce-excerpt ">([\s\S]*?)<\/div>/);
  const suitableMatch = block.match(
    /elementor-repeater-item-1382e97">([^<]*)<\/span><span class="repeater-item elementor-repeater-item-02286fa">([^<]*)<\/span>/,
  );

  const carouselImages = [...block.matchAll(/swiper-slide-image" src="([^"]+)" alt="([^"]*)"/g)].map(
    (m) => ({ url: m[1], alt: m[2] }),
  );

  if (!titleMatch || !moreInfoMatch) continue;

  const title = stripTags(titleMatch[1]);
  const moreInfoHref = moreInfoMatch[1];
  const slug = moreInfoHref.replace(/\/$/, "").split("/").pop() ?? "";

  let subtitle = "";
  let body = "";
  if (excerptMatch) {
    const paragraphs = [...excerptMatch[1].matchAll(/<p>([\s\S]*?)<\/p>/g)].map((p) => stripTags(p[1]));
    subtitle = paragraphs[0] ?? "";
    body = paragraphs.slice(1).join("\n\n");
  }

  books.push({
    slug,
    title,
    subtitle,
    body,
    suitableFor: suitableMatch ? `${stripTags(suitableMatch[1])} ${stripTags(suitableMatch[2])}`.trim() : "",
    moreInfoHref,
    buyNowHref: buyNowMatch?.[1] ?? moreInfoHref,
    carouselImages,
  });
}

writeFileSync(join(__dirname, "our-books-products.json"), JSON.stringify(books, null, 2));
console.log(`Parsed ${books.length} books`);
