import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("home form opens the reviewer route and main.js mounts it", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.route(/guidedtrack\.com/, route => route.abort())
    await page.goto(`${baseUrl}/index.html`)
    await page.waitForSelector(".harness-home-form")

    await page.fill('input[name="key"]', "abc1234")
    await page.check('input[name="mode"][value="run"]')
    await page.click('button[type="submit"]')

    await page.waitForURL(/\?key=abc1234&mode=run$/)
    await page.waitForSelector(".harness-banner")
    assert.match(
      await page.locator(".harness-message").innerText(),
      /Could not load GuidedTrack/,
    )
  })
})
