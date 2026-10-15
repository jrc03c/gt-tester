// THROWAWAY SPIKE. Compares modern-screenshot's DOM rendering of a GT page
// against a real browser screenshot. Writes spikes/out/real.png and spikes/out/dom.png.
// Usage: node spikes/screenshot-fidelity.mjs [programKey]
import { chromium } from "playwright"
import { mkdirSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const libraryPath = require.resolve("modern-screenshot/dist/index.js")

const key = process.argv[2] || "odwuk6y"
const url = `https://www.guidedtrack.com/programs/${key}/run`
mkdirSync("spikes/out", { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } })
await page.goto(url, { waitUntil: "load" })
await page.waitForFunction(
  () => window.jQuery && window.program_contents,
  null,
  {
    timeout: 30000,
  },
)
await page.waitForTimeout(2000)

await page.screenshot({ path: "spikes/out/real.png" })

await page.addScriptTag({ path: libraryPath })
const started = Date.now()
const dataUrl = await page.evaluate(async () => {
  return window.modernScreenshot.domToPng(document.documentElement, {
    scale: 1,
    backgroundColor: "#ffffff",
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  })
})
console.log(`modern-screenshot took ${Date.now() - started} ms`)
writeFileSync(
  "spikes/out/dom.png",
  Buffer.from(dataUrl.split(",")[1], "base64"),
)

await browser.close()
console.log("wrote spikes/out/real.png and spikes/out/dom.png")
