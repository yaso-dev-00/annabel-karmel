import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = await fetch("https://www.annabelkarmel.com/recipes/sweet-potato-spinach/", {
  headers: { "user-agent": "Mozilla/5.0" },
}).then((r) => r.text());

function svgToTsx(name, svg) {
  const withClass = svg.replace("<svg ", '<svg className={className} aria-hidden ');
  return `export function ${name}({ className }: { className?: string }) {
  return (
    ${withClass}
  );
}
`;
}

const allergenListIdx = html.indexOf("elementor-element-b260110");
const sectionStart = html.lastIndexOf("elementor-inner-section", allergenListIdx - 15000);
const section = html.slice(sectionStart, allergenListIdx + 500);
const dietarySvg = [...section.matchAll(/<svg[\s\S]*?<\/svg>/gi)].find((m) => m[0].includes("fa9494"))?.[0];

const agesMatch = html.match(/elementor-element-81ff09e[\s\S]{0,2000}?<svg[\s\S]*?<\/svg>/i);
const ages = agesMatch?.[0].match(/<svg[\s\S]*?<\/svg>/i)?.[0];

const listIcons = [
  ...html
    .slice(html.indexOf("recipe-suitable"), html.indexOf("Ingredients</h2>"))
    .matchAll(/elementor-icon-list-icon">\s*([\s\S]*?)\s*<\/span>\s*<span class="elementor-icon-list-text">([^<]+)/gi),
].map(([, svg, label]) => ({ label: label.trim(), svg: svg.trim() }));

const iconDir = join(root, "public", "recipe-icons");
await mkdir(iconDir, { recursive: true });
if (dietarySvg) {
  await writeFile(join(iconDir, "dietary.svg"), dietarySvg);
  console.log("wrote dietary.svg", dietarySvg.length);
}

const dietaryComponent = `export function RecipeIconDietary({ className }: { className?: string }) {
  return (
    <img
      src="/recipe-icons/dietary.svg"
      alt=""
      className={className}
      width={28}
      height={28}
      decoding="async"
    />
  );
}
`;

const parts = [
  dietaryComponent,
  ages ? svgToTsx("RecipeIconAges", ages) : "",
  svgToTsx("RecipeIconFreezing", listIcons.find((i) => /freezing/i.test(i.label)).svg),
  svgToTsx("RecipeIconPrep", listIcons.find((i) => /5 mins/i.test(i.label)).svg),
  svgToTsx("RecipeIconCook", listIcons.find((i) => /15 mins/i.test(i.label)).svg),
  svgToTsx("RecipeIconPortions", listIcons.find((i) => /portion/i.test(i.label)).svg),
].filter(Boolean);

await writeFile(join(root, "components", "recipe-detail-icons", "index.tsx"), parts.join("\n\n"));
console.log("done");
