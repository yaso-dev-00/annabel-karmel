const res = await fetch("https://www.annabelkarmel.com/advice/toddler-top-tips-to-healthy-food-habits/");
const html = await res.text();
const idx = html.indexOf("Troubleshooting");
console.log(html.slice(idx, idx + 1200));
