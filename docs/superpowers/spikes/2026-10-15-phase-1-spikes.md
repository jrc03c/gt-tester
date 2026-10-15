# Phase 1 spike findings

## Spike A: source line numbers in the public build

Program tested: `odwuk6y` at https://www.guidedtrack.com/programs/odwuk6y/run

Result: could not determine (partially answered)

The first JSON block (compiled node `line_number` counts) printed successfully on both of two
runs with identical results, and clearly shows `withLineNumber` greater than zero for every
program. The second JSON block (trace events) never printed on either run: the script crashed
with an uncaught `TimeoutError` while attempting to click the first page's submit button, which
stayed disabled (it is a textbox question awaiting input, not a free-standing button). Because
the script exits on that exception before reaching `window.__traces`, there is no evidence either
way on whether `guidedtrack:trace` actually fires with the `{ detail: { from, to, program } }`
shape.

Evidence:

Run 1 and run 2 of `node spikes/trace-lines.mjs` produced byte-for-byte identical output:

```
[page] %cDownload the React DevTools for a better development experience: https://fb.me/react-devtools font-weight:bold
compiled nodes with line_number: [
  {
    "name": "🚧 gt-tester demo 🚧",
    "nodes": 65,
    "withLineNumber": 64
  },
  {
    "name": "@jrc03c/random",
    "nodes": 29,
    "withLineNumber": 17
  }
]
node:internal/modules/run_main:107
    triggerUncaughtException(
    ^

locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('.program_container .main button, .program_container .main .btn').first()
    - locator resolved to <button type="submit" disabled="disabled" class="btn btn-primary answer_submit textbox">Submit</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    58 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

    at /home/ubuntu/workspace/spikes/trace-lines.mjs:39:16 {
  name: 'TimeoutError'
}

Node.js v24.13.0
```

No second JSON block ("trace events: ...") was produced on either run; the process exited before
reaching that line.

Consequence: Compiled nodes clearly carry `line_number` in the public build (64 of 65 nodes for
the demo program, 17 of 29 for `@jrc03c/random`), so the data needed for line ranges exists in
`program_contents`. Whether the `guidedtrack:trace` event actually delivers `{ from, to, program }`
during interaction is still unconfirmed, because this demo program's first page has no clickable
element that is enabled without first providing input, so the script's interaction step never ran.
Phase 2 should treat line-range display as not yet verified end-to-end: the static data source
(`program_contents[*].nodes[*].line_number`) looks usable on its own even without relying on the
trace event, but confirming the live `guidedtrack:trace` payload shape needs a follow-up spike
against a program (or program state) whose first page has an immediately-clickable button, or a
script that fills the textbox before clicking.

## Spike B: screenshot fidelity

(filled in by Task 3)
