// THROWAWAY SPIKE. Answers: does the public build expose source line numbers?
// Usage: node spikes/trace-lines.mjs [programKey]
import { chromium } from "playwright"

const key = process.argv[2] || "odwuk6y"
const url = `https://www.guidedtrack.com/programs/${key}/run`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } })
page.on("console", message => console.log("[page]", message.text()))

await page.goto(url, { waitUntil: "load" })
await page.waitForFunction(
  () => window.jQuery && window.program_contents,
  null,
  {
    timeout: 30000,
  },
)

const counts = await page.evaluate(() => {
  window.__traces = []
  window.jQuery(window).on("guidedtrack:trace", (_event, options) => {
    window.__traces.push(options)
  })
  return Object.entries(window.program_contents)
    .filter(([, value]) => value && value.nodes)
    .map(([name, program]) => {
      const nodes = Object.values(program.nodes)
      return {
        name,
        nodes: nodes.length,
        withLineNumber: nodes.filter(node => node.line_number != null).length,
      }
    })
})
console.log("compiled nodes with line_number:", JSON.stringify(counts, null, 2))

const button = page
  .locator(".program_container .main button, .program_container .main .btn")
  .first()
if ((await button.count()) > 0) {
  await button.click()
  await page.waitForTimeout(2000)
} else {
  console.log(
    "no button found on the first page; traces below are from page load only",
  )
}

const traces = await page.evaluate(() => window.__traces)
console.log("trace events:", JSON.stringify(traces, null, 2))

await browser.close()
