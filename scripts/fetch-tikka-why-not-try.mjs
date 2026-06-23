const res = await fetch("https://www.annabelkarmel.com/products/chicken-tikka-masala/");
const html = await res.text();
const block = html.match(/Why not try[\s\S]{0,8000}?Share the love/)?.[0] ?? "";
const imgs = [...block.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
const bg = html.match(/data-dce-background-image-url="([^"]+)"[\s\S]{0,200}wp_why_not_try/)?.[1];
console.log("bg:", bg);
console.log("imgs:", imgs);
