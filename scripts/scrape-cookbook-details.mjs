import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const slugs = [
  "finger-foods",
  "weaning-2",
  "new-complete-baby-toddler-meal-planner-25th-anniversary-edition",
  "my-first-cookbook",
  "where-does-my-food-come-from",
  "fun-fast-easy-childrens-cookbook",
  "weaning-made-simple",
  "real-foods-kids-will-love",
  "baby-led-weaning-recipe-book",
  "annabels-family-cookbook",
  "babys-first-year-journal",
];

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(html) {
  const postContentMatch = html.match(
    /elementor-widget-theme-post-content[\s\S]*?>([\s\S]*?)<\/div>\s*<div class="dce-fix-background-loop/,
  );

  if (postContentMatch) {
    const block = postContentMatch[1];
    return [...block.matchAll(/<p>([\s\S]*?)<\/p>/g)]
      .map((p) => decodeHtml(p[1]))
      .filter(Boolean);
  }

  return [];
}

function extractHighlights(html) {
  const highlights = new Set();
  const postContentMatch = html.match(
    /elementor-widget-theme-post-content[\s\S]*?>([\s\S]*?)<\/div>\s*<div class="dce-fix-background-loop/,
  );

  if (!postContentMatch) {
    return [];
  }

  const block = postContentMatch[1];
  for (const strong of block.matchAll(/<strong>(?:<em>)?([\s\S]*?)(?:<\/em>)?<\/strong>/g)) {
    const text = decodeHtml(strong[1]);
    if (text) highlights.add(text);
  }

  return [...highlights];
}

async function fetchOne(slug) {
  const url = `https://www.annabelkarmel.com/apps-books/${slug}/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${slug}: ${res.status}`);
  const html = await res.text();

  const titleMatch = html.match(/<h2 class="elementor-heading-title[^"]*">([\s\S]*?)<\/h2>/);
  const title = titleMatch ? decodeHtml(titleMatch[1]) : slug;
  const paragraphs = extractParagraphs(html);
  const highlights = extractHighlights(html);

  return { slug, title, paragraphs, highlights };
}

const results = [];
for (const slug of slugs) {
  const data = await fetchOne(slug);
  results.push(data);
  console.log(`${slug}: ${data.paragraphs.length} paragraphs`);
}

writeFileSync(join(__dirname, "cookbook-details.json"), JSON.stringify(results, null, 2));
console.log("Wrote cookbook-details.json");
