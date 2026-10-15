import { test } from "node:test"
import assert from "node:assert/strict"
import { feedbackSidecar, feedbackReportHtml } from "../../src/send-local.js"

test("feedbackSidecar keeps everything except the image bytes", () => {
  const item = {
    key: "abc1234",
    mode: "test",
    reviewerName: "Alice",
    text: "Button is misaligned",
    annotations: [{ id: "p", type: "pen", points: [[0, 0]] }],
    context: { lines: [{ from: 1, to: 3, program: "main" }] },
    image: { url: "blob:x", width: 800, height: 600, blob: {} },
  }
  assert.deepEqual(
    feedbackSidecar(item, () => "2026-10-15T12:00:00.000Z"),
    {
      createdAt: "2026-10-15T12:00:00.000Z",
      key: "abc1234",
      mode: "test",
      reviewerName: "Alice",
      text: "Button is misaligned",
      annotations: [{ id: "p", type: "pen", points: [[0, 0]] }],
      context: { lines: [{ from: 1, to: 3, program: "main" }] },
      imageSize: { width: 800, height: 600 },
    },
  )
})

test("feedbackSidecar defaults the reviewer name to an empty string", () => {
  const item = {
    key: "k",
    mode: "run",
    text: "",
    annotations: [],
    context: {},
    image: { width: 1, height: 1 },
  }
  assert.equal(feedbackSidecar(item).reviewerName, "")
})

function reportSidecar(overrides = {}) {
  return {
    createdAt: "2026-10-15T12:00:00.000Z",
    key: "abc1234",
    mode: "test",
    reviewerName: "Alice <Ops>",
    text: "The <b>&</b> button\nis broken",
    annotations: [],
    context: {
      lines: [
        { from: 3, to: 5, program: "main" },
        { from: 12, to: 12, program: "sub" },
      ],
      runId: 42,
      programName: "main",
      nodeId: "n7",
      variables: { name: "</script><script>alert(1)</script>", n: 3 },
      variablesTruncated: true,
      viewport: { width: 390, height: 844 },
      userAgent: "TestAgent/1.0",
      capturedAt: "2026-10-15T11:59:59.000Z",
    },
    imageSize: { width: 2, height: 1 },
    ...overrides,
  }
}

const DATA_URL = "data:image/png;base64,iVBORw0KGgo="

test("feedbackReportHtml escapes the reviewer's text", () => {
  const html = feedbackReportHtml({
    sidecar: reportSidecar(),
    imageDataUrl: DATA_URL,
  })
  assert.match(html, /^<!doctype html>/i)
  assert.ok(html.includes("&lt;b&gt;&amp;&lt;/b&gt;"))
  assert.ok(!html.includes("<b>"))
  assert.ok(html.includes("Alice &lt;Ops&gt;"))
  assert.match(
    html,
    /<title>Feedback for abc1234 \(test\) at 2026-10-15T12:00:00.000Z<\/title>/,
  )
  assert.match(html, /<pre>The &lt;b&gt;/)
})

test("feedbackReportHtml embeds the image and the context", () => {
  const html = feedbackReportHtml({
    sidecar: reportSidecar(),
    imageDataUrl: DATA_URL,
  })
  assert.ok(html.includes(`<img src="${DATA_URL}"`))
  assert.ok(html.includes("main: lines 3-5"))
  assert.ok(html.includes("sub: line 12"))
  assert.ok(html.includes("42"))
  assert.ok(html.includes("n7"))
  assert.ok(html.includes("390 x 844"))
  assert.ok(html.includes("TestAgent/1.0"))
  assert.ok(html.includes("<td>n</td>"))
  assert.ok(html.includes("<td>3</td>"))
  assert.match(html, /truncated/i)
})

test("feedbackReportHtml neutralises </script> in embedded data", () => {
  const sidecar = reportSidecar()
  const html = feedbackReportHtml({ sidecar, imageDataUrl: DATA_URL })
  assert.ok(html.includes("\\u003c/script"))
  const open = '<script type="application/json" id="feedback-sidecar">'
  const start = html.indexOf(open)
  assert.ok(start > 0)
  const end = html.indexOf("</script>", start)
  // The first </script> after the opening tag must be the block's own
  // closing tag: everything between parses back to the sidecar.
  assert.deepEqual(JSON.parse(html.slice(start + open.length, end)), sidecar)
  assert.equal(html.split("</script>").length - 1, 1)
})

test("feedbackReportHtml copes with empty context and no reviewer", () => {
  const html = feedbackReportHtml({
    sidecar: reportSidecar({ reviewerName: "", text: "", context: {} }),
    imageDataUrl: DATA_URL,
  })
  assert.ok(!html.includes("Reviewer"))
  assert.ok(html.includes("feedback-sidecar"))
})
