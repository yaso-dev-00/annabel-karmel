const res = await fetch("https://www.annabelkarmel.com/advice/formula-milk/", {
  headers: { "user-agent": "Mozilla/5.0" },
});
const html = await res.text();

const startIdx = html.indexOf("Choosing a formula");
const endIdx = html.indexOf("Related Advice");
const region = html.slice(startIdx - 300, endIdx);

// Walk headings, images, and horizontal-rule / divider markers in document order.
const tokenRe =
  /<h([234])[^>]*>([\s\S]*?)<\/h\1>|<img[^>]*(?:data-src|src)="([^"]+)"[^>]*>|<hr[^>]*>|class="[^"]*(divider|separator)[^"]*"/gi;
let m;
while ((m = tokenRe.exec(region))) {
  if (m[2] !== undefined) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    if (text) console.log(`H${m[1]}:`, text);
  } else if (m[3]) {
    if (m[3].includes("wp-content/uploads")) console.log("   IMG:", m[3]);
  } else if (m[0].toLowerCase().startsWith("<hr")) {
    console.log("   --- HR ---");
  } else {
    console.log("   [divider class]", m[0]);
  }
}
