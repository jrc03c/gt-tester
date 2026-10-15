import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("flattenToPng draws the image and the annotations into a PNG", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/flatten.html`)
    await page.waitForFunction(() => window.fixtureReady === true)

    const result = await page.evaluate(async () => {
      const { flattenToPng, pixelAt } = window.harness
      const blob = await flattenToPng({
        imageUrl: window.imageUrl,
        imageSize: { width: 400, height: 300 },
        annotations: [
          {
            id: "p",
            type: "pen",
            points: [
              [0, 150],
              [400, 150],
            ],
          },
          {
            id: "c",
            type: "callout",
            anchor: [50, 250],
            box: { x: 200, y: 200, w: 150, h: 60 },
            text: "note",
          },
        ],
      })
      return {
        type: blob.type,
        onStroke: await pixelAt(blob, 200, 150),
        offStroke: await pixelAt(blob, 200, 20),
        inBox: await pixelAt(blob, 330, 250),
      }
    })

    assert.equal(result.type, "image/png")
    assert.equal(result.onStroke.width, 400)
    assert.equal(result.onStroke.height, 300)
    assert.ok(
      result.onStroke.r > 200 && result.onStroke.g < 100,
      `stroke pixel ${JSON.stringify(result.onStroke)}`,
    )
    assert.ok(
      result.offStroke.r > 215 && result.offStroke.r < 227,
      `background pixel ${JSON.stringify(result.offStroke)}`,
    )
    assert.ok(
      result.inBox.r > 250 && result.inBox.g > 250 && result.inBox.b > 250,
      `box pixel ${JSON.stringify(result.inBox)}`,
    )
  })
})
