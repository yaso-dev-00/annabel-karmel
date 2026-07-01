import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const scriptsDir = path.join(root, "scripts");
const outDir = path.join(root, "data", "footer-pages");

const legalPages = [
  { slug: "cookie-policy", file: "cookie-policy-live.html", title: "Cookie Policy" },
  { slug: "terms-conditions", file: "terms-conditions-live.html", title: "Terms & Conditions" },
  { slug: "privacy-policy", file: "privacy-policy-live.html", title: "Privacy Policy" },
];

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…");
}

function rewriteLinks(html) {
  return html
    .replace(/https?:\/\/www\.annabelkarmel\.com\/privacy-policy\/?/g, "/privacy-policy")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/terms-conditions\/?/g, "/terms-conditions")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/cookie-policy\/?/g, "/cookie-policy")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/contact-us\/?/g, "/contact")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/contact\/?/g, "/contact")
    .replace(/https?:\/\/annabelkarmel\.com\/contact-us-2\/?/g, "/contact")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/the-ultimate-baby-toddler-recipe-app\/?/g, "/the-ultimate-baby-toddler-recipe-app")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/app-book-category\/our-books\/?/g, "/app-book-category/our-books")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/product-category\/chilled-meals\/?/g, "/product-category/chilled-meals")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/product-category\/frozen-meals\/?/g, "/product-category/frozen-meals")
    .replace(/https?:\/\/www\.annabelkarmel\.com\/apps-books\/[^"']+/g, "/app-book-category/our-books")
    .replace(/target="_blank"\s*/g, "")
    .replace(/rel="noopener"\s*/g, "");
}

function extractDceContent(html) {
  const startToken = '<div class="dce-content-wrapper">';
  const start = html.indexOf(startToken);
  if (start === -1) {
    throw new Error("Could not find dce-content-wrapper");
  }
  const contentStart = start + startToken.length;
  const end = html.indexOf("</div></div>", contentStart);
  if (end === -1) {
    throw new Error("Could not find dce-content end");
  }
  return rewriteLinks(decodeHtml(html.slice(contentStart, end).trim()));
}

function toExportName(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Page";
}

function writeLegalPage(slug, title, html) {
  const filePath = path.join(outDir, `${slug}.ts`);
  const exportName = toExportName(slug);
  const escaped = html.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  fs.writeFileSync(
    filePath,
    `export const ${exportName} = {\n  title: ${JSON.stringify(title)},\n  html: \`${escaped}\`,\n};\n`,
    "utf8",
  );
  console.log(`Wrote ${filePath}`);
}

fs.mkdirSync(outDir, { recursive: true });

for (const page of legalPages) {
  const htmlPath = path.join(scriptsDir, page.file);
  const html = fs.readFileSync(htmlPath, "utf8");
  writeLegalPage(page.slug, page.title, extractDceContent(html));
}

console.log("Done");
