import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const breastfeedingSlugs = [
  "breastmilk-storage",
  "pumping",
  "newborn-feeding-patterns",
  "breastfeeding-friendly-bottle-feeding",
  "comfort-feeding",
  "finding-pumping-routine",
  "breastfeeding-cues",
  "breastfeeding-sessions",
  "breast-feeding-myths",
  "introduction-to-breastfeeding",
  "breastfeeding-getting-started",
  "managing-breast-engorgement",
  "have-i-got-enough-breast-milk",
  "breastfeeding-multiples",
  "breast-milk",
  "reflux-expert-advice",
];

const sleepSlugs = [
  "busting-common-baby-sleep-myths",
  "supporting-baby-wake-night",
  "baby-nap-times",
  "baby-bedtime",
  "baby-sleep-routine",
];

const bfBaseCss = path.join(
  "components",
  "ArticleScreen",
  "BreastfeedingArticlePage",
  "breastfeeding-article.module.css",
);
const sleepBaseCss = path.join(
  "components",
  "ArticleScreen",
  "SleepAdviceArticlePage",
  "sleep-advice.module.css",
);

async function ensureImport(file) {
  let src = await readFile(file, "utf8");
  if (src.includes('from "./page.module.css"')) {
    console.log("skip import (exists)", file);
    return src;
  }
  // Insert the styles import right after the last import line.
  const lines = src.split("\n");
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) lastImport = i;
  }
  lines.splice(lastImport + 1, 0, 'import styles from "./page.module.css";');
  src = lines.join("\n");
  return src;
}

async function processBreastfeeding(slug) {
  const dir = path.join("app", "advice", slug);
  await copyFile(bfBaseCss, path.join(dir, "page.module.css"));

  const file = path.join(dir, "page.tsx");
  let src = await ensureImport(file);
  if (!/styles=\{styles\}/.test(src)) {
    src = src.replace(
      /blocks=\{article\.blocks\}\s*\/>/,
      "blocks={article.blocks} styles={styles} />",
    );
  }
  await writeFile(file, src);
  console.log("bf done", slug);
}

async function processSleep(slug) {
  const dir = path.join("app", "advice", slug);
  await copyFile(sleepBaseCss, path.join(dir, "page.module.css"));

  const file = path.join(dir, "page.tsx");
  let src = await ensureImport(file);
  if (!/styles=\{styles\}/.test(src)) {
    src = src.replace(
      /attributionImage=\{`\$\{articlePath\}\/kerry-secker\.jpg`\}\s*\n(\s*)\/>/,
      "attributionImage={`${articlePath}/kerry-secker.jpg`}\n$1  styles={styles}\n$1/>",
    );
  }
  await writeFile(file, src);
  console.log("sleep done", slug);
}

for (const slug of breastfeedingSlugs) await processBreastfeeding(slug);
for (const slug of sleepSlugs) await processSleep(slug);
console.log("ALL DONE");
