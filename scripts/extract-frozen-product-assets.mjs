import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urls = [
  "chicken-tikka-masala",
  "tasty-spaghetti-bolognese",
  "mighty-bolognese-mac-and-cheese",
  "chicken-tomato-mascarpone-pasta",
];

function decodeHtml(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

for (const slug of urls) {
  const res = await fetch(`https://www.annabelkarmel.com/products/${slug}/`);
  const html = await res.text();

  const color = html.match(/data-dce-background-color="(#[^"]+)"[\s\S]{0,200}wp_cloud_sl/)?.[1];

  const whyBg = html.match(/data-dce-background-image-url="([^"]+)"[\s\S]{0,200}wp_why_not_try/)?.[1];

  const heroDesktop = html.match(
    /elementor-hidden-mobile[\s\S]{0,400}src="([^"]+)"/,
  )?.[1];
  const heroMobile = html.match(
    /elementor-hidden-widescreen[\s\S]{0,400}src="([^"]+)"/,
  )?.[1];

  const carouselBlock = html.match(/prd-image-carousel[\s\S]{0,4000}?<\/div>\s*<\/div>\s*<\/div>/);
  const carousel = carouselBlock
    ? [...carouselBlock[0].matchAll(/swiper-slide-image" src="([^"]+)"/g)].map((m) => m[1])
    : [];

  const detailSection = html.match(/wp_cloud_sl[\s\S]{0,30000}?wp_say_hello/);
  const badges = detailSection
    ? [...detailSection[0].matchAll(/src="(https:\/\/www\.annabelkarmel\.com\/wp-content\/uploads\/[^"]+)"/g)]
        .map((m) => m[1])
        .filter((src) => /Artboard|badge|Cook-from|low-in|ready-in|British|dairy|veg|salt|protein|sugar/i.test(src))
    : [];

  const description = decodeHtml(
    html.match(/wp_say_hello[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? "",
  );

  const retailerSection = html.match(
    /Discover in the freezer aisle[\s\S]{0,6000}?<\/section>\s*<\/div>\s*<\/div>\s*<\/section>/,
  )?.[0];
  const retailerBg = html.match(
    /data-dce-background-image-url="([^"]+)"[\s\S]{0,2500}Discover in the freezer aisle/,
  )?.[1];

  const retailerLogos = retailerSection
    ? [...retailerSection.matchAll(/href="([^"]+)"[\s\S]{0,300}?src="([^"]+)"/g)].map((m) => ({
        href: m[1],
        src: m[2],
      }))
    : [];

  const relatedBlock = html.match(/Why not try[\s\S]{0,8000}?Share the love/);
  const related = relatedBlock
    ? [...relatedBlock[0].matchAll(
        /src="([^"]+)"[\s\S]{0,500}?href="https:\/\/www\.annabelkarmel\.com\/products\/([^"/]+)\//g,
      )].map((m) => ({ image: m[1], href: `/products/${m[2]}/` }))
    : [];

  const title = decodeHtml(
    html.match(/wp_meals_heading[\s\S]{0,200}<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "",
  );

  const intro = decodeHtml(html.match(/-info[\s\S]{0,200}<p>([\s\S]*?)<\/p>/)?.[1] ?? "");

  const accordionBlock = html.match(/elementor-accordion">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="elementor-element elementor-element-[^"]+ elementor-widget elementor-widget-html"/);
  const accordionItems = accordionBlock
    ? [...accordionBlock[1].matchAll(/<div class="elementor-accordion-item">([\s\S]*?)<\/div>\s*<\/div>/g)].map(
        (match) => {
          const block = match[1];
          const title = block.match(/accordion-title"[^>]*>([^<]+)</)?.[1]?.trim();
          const content = block.match(/elementor-tab-content[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
          const tableMatch = content.match(/<table>[\s\S]*?<\/table>/);
          if (tableMatch) {
            const rows = [...tableMatch[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
              [...row[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((cell) => decodeHtml(cell[1])),
            );
            return { title, table: { headers: rows[0], rows: rows.slice(1) } };
          }
          const paragraphs = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((p) => {
            const raw = p[1];
            return raw
              .replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**")
              .replace(/<[^>]+>/g, "")
              .replace(/&amp;/g, "&")
              .trim();
          });
          return { title, paragraphs };
        },
      )
    : [];

  const data = {
    slug,
    color,
    heroDesktop,
    heroMobile,
    title,
    intro,
    description,
    carousel,
    badges,
    retailerBg,
    retailerLogos,
    whyBg,
    related,
    accordion: accordionItems,
  };

  writeFileSync(join(__dirname, `frozen-product-${slug}.json`), JSON.stringify(data, null, 2));
  console.log("wrote", slug, "color", color, "whyBg", whyBg, "carousel", carousel.length);
}
