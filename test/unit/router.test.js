import { test } from "node:test"
import assert from "node:assert/strict"
import { parseRoute } from "../../src/router.js"

test("no parameters routes to home", () => {
  assert.deepEqual(parseRoute(""), { screen: "home" })
  assert.deepEqual(parseRoute("?"), { screen: "home" })
})

test("key routes to the reviewer screen in run mode by default", () => {
  assert.deepEqual(parseRoute("?key=abc1234"), {
    screen: "reviewer",
    key: "abc1234",
    mode: "run",
  })
})

test("mode=test is honoured, anything else means run", () => {
  assert.equal(parseRoute("?key=abc1234&mode=test").mode, "test")
  assert.equal(parseRoute("?key=abc1234&mode=run").mode, "run")
  assert.equal(parseRoute("?key=abc1234&mode=banana").mode, "run")
})

test("key is trimmed and an empty key routes home", () => {
  assert.equal(parseRoute("?key=%20abc1234%20").key, "abc1234")
  assert.deepEqual(parseRoute("?key=%20%20"), { screen: "home" })
})
