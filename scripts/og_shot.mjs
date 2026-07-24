// Captura scripts/.og.html a 1200x630 y lo exporta como public/images/og.jpg.
// Requiere: python3 scripts/og_build.py corrido antes, y `npx playwright` disponible.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = dirname(here);
const htmlPath = join(here, ".og.html");
const pngPath = join(here, ".og.png");
const jpgPath = join(root, "public", "images", "og.jpg");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1000);
await page.screenshot({ path: pngPath });
await browser.close();

// PNG -> JPEG optimizado con Pillow (evita dependencias JS extra)
execFileSync("python3", [
  "-c",
  `from PIL import Image; Image.open(r"${pngPath}").convert("RGB").save(r"${jpgPath}","JPEG",quality=90,optimize=True,progressive=True)`,
]);
console.log("og.jpg escrito:", jpgPath);
