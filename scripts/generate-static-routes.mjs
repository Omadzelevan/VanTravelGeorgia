import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = process.env.VITE_SITE_URL || "https://vantravelgeorgia.netlify.app";
const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const tours = [
  { id: 1, title: "Kazbegi Mountain Escape", description: "Experience the breathtaking beauty of the Caucasus Mountains with Gergeti Trinity Church and panoramic views." },
  { id: 2, title: "Kakheti Wine Journey", description: "Discover Georgia's wine-making heritage with traditional cellars, tastings and cultural routes in Kakheti." },
  { id: 3, title: "Batumi Coastal Tour", description: "Explore Batumi's coastline, modern architecture and vibrant seaside atmosphere on a private guided trip." },
  { id: 4, title: "Ushguli Adventure", description: "Journey to Svaneti and Ushguli for medieval towers, mountain landscapes and authentic local traditions." },
  { id: 5, title: "Tbilisi City Vibes", description: "Discover Tbilisi's old town streets, fortress views, sulfur baths and Georgian food and wine culture." },
];

function injectSeo(html, { title, description, routePath }) {
  const fullTitle = `${title} | VanTravelGeorgia`;
  const canonical = `${siteUrl}${routePath}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${fullTitle}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${fullTitle}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${fullTitle}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
}

async function main() {
  const baseHtml = await fs.readFile(indexPath, "utf8");

  for (const tour of tours) {
    const routePath = `/tour/${tour.id}`;
    const html = injectSeo(baseHtml, { ...tour, routePath });
    const routeDir = path.join(distDir, "tour", String(tour.id));
    await fs.mkdir(routeDir, { recursive: true });
    await fs.writeFile(path.join(routeDir, "index.html"), html, "utf8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
