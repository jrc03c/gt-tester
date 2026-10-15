import { test } from "node:test"
import assert from "node:assert/strict"
import {
  createContextTracker,
  capVariables,
  VARIABLES_LIMIT,
} from "../../src/context.js"
import { createEmitter } from "../../src/gt-embed.js"

const fakeData = {
  get: field => ({ run_id: "run-123", current_program_name: "main" })[field],
  node: () => "node-abc",
  export_heap: () => ({ name: "Alice", score: 42 }),
}

function tracker(events, getData = () => fakeData) {
  return createContextTracker(events, {
    getData,
    getViewport: () => ({ width: 800, height: 600 }),
    getUserAgent: () => "TestAgent/1.0",
    now: () => "2026-10-15T12:00:00.000Z",
  })
}

test("collects trace lines for the current page and resets on pageStart", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("pageStart")
  events.emit("trace", { from: 1, to: 3, program: "main" })
  events.emit("trace", { from: 10, to: 12, program: "main" })
  assert.deepEqual(context.lines, [
    { from: 1, to: 3, program: "main" },
    { from: 10, to: 12, program: "main" },
  ])
  events.emit("pageStart")
  assert.deepEqual(context.lines, [])
})

test("ignores traces without a numeric from", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("trace", undefined)
  events.emit("trace", { program: "main" })
  assert.deepEqual(context.lines, [])
})

test("snapshot assembles run state and environment", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("trace", { from: 1, to: 3, program: "main" })
  assert.deepEqual(context.snapshot(), {
    lines: [{ from: 1, to: 3, program: "main" }],
    runId: "run-123",
    programName: "main",
    nodeId: "node-abc",
    variables: { name: "Alice", score: 42 },
    variablesTruncated: false,
    viewport: { width: 800, height: 600 },
    userAgent: "TestAgent/1.0",
    capturedAt: "2026-10-15T12:00:00.000Z",
  })
})

test("snapshot survives missing or throwing run data", () => {
  const events = createEmitter()
  const missing = tracker(events, () => undefined).snapshot()
  assert.equal(missing.runId, null)
  assert.deepEqual(missing.variables, {})
  const throwing = tracker(events, () => {
    throw new Error("boom")
  }).snapshot()
  assert.equal(throwing.nodeId, null)
})

test("capVariables keeps whole variables until the limit and flags truncation", () => {
  const big = { a: "x".repeat(40), b: "y".repeat(40) }
  assert.deepEqual(capVariables(big, 60), {
    variables: { a: "x".repeat(40) },
    truncated: true,
  })
  assert.deepEqual(capVariables({ a: 1 }, VARIABLES_LIMIT), {
    variables: { a: 1 },
    truncated: false,
  })
})
