import { test } from "node:test"
import assert from "node:assert/strict"
import { feedbackSidecar } from "../../src/send-local.js"

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
