import fs from "node:fs";

const html = fs.readFileSync("scripts/contact-live.html", "utf8");
const match = html.match(/name="address-1-country"[\s\S]*?<\/select>/);
if (!match) {
  console.error("country select not found");
  process.exit(1);
}

const countries = [...match[0].matchAll(/<option value="([^"]*)"[^>]*>([^<]*)<\/option>/g)]
  .map(([, , label]) => label.trim())
  .filter(Boolean);

fs.writeFileSync("data/contact-countries.ts", `export const contactCountries = ${JSON.stringify(countries, null, 2)} as const;\n`);
console.log(`wrote ${countries.length} countries`);
