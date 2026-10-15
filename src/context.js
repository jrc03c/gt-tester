export const VARIABLES_LIMIT = 100000

export function createContextTracker(
  events,
  {
    getData = () => window.data,
    getViewport = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    getUserAgent = () => navigator.userAgent,
    now = () => new Date().toISOString(),
  } = {},
) {
  let lines = []

  events.on("pageStart", () => {
    lines = []
  })

  events.on("trace", detail => {
    if (detail && typeof detail.from === "number") {
      lines.push({ from: detail.from, to: detail.to, program: detail.program })
    }
  })

  return {
    get lines() {
      return lines.slice()
    },
    snapshot() {
      const data = safely(getData)
      const heap = safely(() => data.export_heap()) || {}
      const { variables, truncated } = capVariables(heap)
      return {
        lines: lines.slice(),
        runId: safely(() => data.get("run_id")) ?? null,
        programName: safely(() => data.get("current_program_name")) ?? null,
        nodeId: safely(() => data.node()) ?? null,
        variables,
        variablesTruncated: truncated,
        viewport: getViewport(),
        userAgent: getUserAgent(),
        capturedAt: now(),
      }
    },
  }
}

export function capVariables(variables, limit = VARIABLES_LIMIT) {
  const kept = {}
  let size = 2
  let truncated = false
  for (const [name, value] of Object.entries(variables)) {
    const entry = JSON.stringify({ [name]: value }) || "{}"
    if (size + entry.length > limit) {
      truncated = true
      break
    }
    kept[name] = value
    size += entry.length
  }
  return { variables: kept, truncated }
}

function safely(fn) {
  try {
    return fn()
  } catch {
    return undefined
  }
}
