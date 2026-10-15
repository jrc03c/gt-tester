# Phase 1 spike findings

## Spike A: source line numbers in the public build

Program tested: `odwuk6y` at https://www.guidedtrack.com/programs/odwuk6y/run

Result: YES

Two earlier runs of the spike script (before it filled the first textbox) crashed with an uncaught `TimeoutError` while trying to click a disabled submit button on the demo program's first page, so the trace-event half of the question was initially unconfirmed (see git history for that intermediate evidence). The script was then updated, at the controller's direction, to fill any text input on the first page before locating an enabled button to click. Rerunning it produced both JSON blocks: `withLineNumber` is greater than zero for every program, and the trace array contains real `{ detail: { from, to, program } }` objects captured from live interaction.

Evidence:

Command: `node spikes/trace-lines.mjs`

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
trace events: [
  {
    "detail": {
      "from": 13,
      "to": 13,
      "program": "🚧 gt-tester demo 🚧"
    }
  },
  {
    "detail": {
      "from": 14,
      "to": 14,
      "program": "🚧 gt-tester demo 🚧"
    }
  },
  {
    "detail": {
      "from": 15,
      "to": 15,
      "program": "🚧 gt-tester demo 🚧"
    }
  },
  {
    "detail": {
      "from": 17,
      "to": 17,
      "program": "🚧 gt-tester demo 🚧"
    }
  },
  {
    "detail": {
      "from": 20,
      "to": 20,
      "program": "🚧 gt-tester demo 🚧"
    }
  }
]
```

Consequence: Compiled nodes clearly carry `line_number` in the public build (64 of 65 nodes for the demo program, 17 of 29 for `@jrc03c/random`), and the `guidedtrack:trace` event fires during real interaction with a payload shaped exactly `{ detail: { from, to, program } }`, where `from` and `to` are source line numbers. Context snapshots in later phases will be able to include line ranges, and the Phase 2 inbox can show them.

## Spike B: screenshot fidelity

(filled in by Task 3)
