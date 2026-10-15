import { startServer } from "./server.js"

const INSTALL_HINT =
  "Playwright 1.49.0 is required for browser tests. Outside the dev container run: " +
  "npm install --no-save playwright@1.49.0 && npx playwright install chromium"

export async function withPage(
  fn,
  { viewport = { width: 800, height: 600 } } = {},
) {
  let playwright
  try {
    playwright = await import("playwright")
  } catch {
    throw new Error(INSTALL_HINT)
  }

  let server
  let browser

  try {
    server = await startServer()
    browser = await playwright.chromium.launch()
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on("pageerror", error => errors.push(error))

    await fn({ page, baseUrl: server.url })
    // Round trip to the page so any pageerror queued after fn resolved is
    // delivered (in order) before we decide whether to throw.
    await page.evaluate(() => undefined)
    if (errors.length > 0) throw errors[0]
  } finally {
    if (browser) await browser.close()
    if (server) await server.close()
  }
}

// Drag with the primary mouse button through intermediate points so pointermove fires.
export async function drag(page, from, to, { steps = 8 } = {}) {
  await page.mouse.move(from[0], from[1])
  await page.mouse.down()
  await page.mouse.move(to[0], to[1], { steps })
  await page.mouse.up()
}
