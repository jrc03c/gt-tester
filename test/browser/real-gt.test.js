import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

const ASSET_BASE = "https://www.guidedtrack.com/assets"

// Loads the real GuidedTrack scripts. The test server's origin is not on the
// program's allow list, so GuidedTrack refuses the embed with its real text.
test("real GuidedTrack refuses an unlisted origin and the harness explains it", async t => {
  try {
    const response = await fetch(`${ASSET_BASE}/gt_interpreter.js`, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
  } catch {
    t.skip("guidedtrack.com unreachable")
    return
  }

  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/reviewer.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    const mount = () =>
      page.evaluate(
        assetBase => window.mount("odwuk6y", "test", assetBase),
        ASSET_BASE,
      )
    await mount()
    // GuidedTrack first sends the whole page through
    // /programs/<key>/embed/auth, which reloads it with ?__gt_embed=<token>.
    // The real app re-mounts from its query string; this fixture mounts on
    // demand, so mount again after the round trip.
    await page.waitForURL(/__gt_embed=/, { timeout: 30000 })
    await page.waitForFunction(() => window.fixtureReady === true)
    await mount()
    await page.waitForSelector(".harness-banner", { timeout: 30000 })

    assert.match(
      await page.locator(".harness-banner h2").innerText(),
      /isn't set up/,
    )
    assert.match(
      await page.locator(".harness-url").innerText(),
      /\/test\/fixtures\/reviewer\.html$/,
    )
    assert.equal(
      await page.locator(`link[href="${ASSET_BASE}/guidedtrack.css"]`).count(),
      1,
    )
  })
})
