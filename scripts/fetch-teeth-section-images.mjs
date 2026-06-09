import { writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.join("public", "articles", "looking-after-childrens-teeth");
const AK = "https://www.annabelkarmel.com/wp-content/uploads";

const sugarUrls = [
  `${AK}/2015/06/Garlic-Pitta-Breadsticks-1-3-optimized.jpg`,
  `${AK}/2015/06/Garlic-Pitta-Breadsticks-1-3.jpg`,
  `${AK}/2015/06/Garlic-Pitta-Breadsticks-1-3-768x576-optimized.jpg`,
  `${AK}/2015/06/Garlic-Pitta-Breadsticks-1-3-1024x768-optimized.jpg`,
];

const labelUrls = [
  `${AK}/2009/05/infused-waters-3-optimized.jpg`,
  `${AK}/2009/05/infused-waters-3.jpg`,
  `${AK}/2009/05/infused-waters-3-962x722-optimized.jpg`,
  `${AK}/2009/05/infused-waters-2-optimized.jpg`,
  `${AK}/2009/05/infused-waters-optimized.jpg`,
];

async function tryUrls(urls, dest) {
  for (const url of urls) {
    for (const useProxy of [false, true]) {
      const fetchUrl = useProxy
        ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`
        : url;
      try {
        const res = await fetch(fetchUrl, {
          headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
            referer: "https://www.annabelkarmel.com/advice/looking-after-childrens-teeth/",
          },
        });
        const buf = Buffer.from(await res.arrayBuffer());
        console.log(path.basename(dest), useProxy ? "proxy" : "direct", res.status, buf.length, url.split("/").pop());
        if (buf.length > 8000) {
          await writeFile(dest, buf);
          return true;
        }
      } catch (e) {
        console.warn(url.split("/").pop(), e.message);
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  return false;
}

const ok1 = await tryUrls(sugarUrls, path.join(out, "04-sugar.jpg"));
const ok2 = await tryUrls(labelUrls, path.join(out, "05-labelling.jpg"));
console.log("results", { ok1, ok2 });
