import { flattenToPng } from "./annotations/flatten.js"

export function feedbackSidecar(item, now = () => new Date().toISOString()) {
  return {
    createdAt: now(),
    key: item.key,
    mode: item.mode,
    reviewerName: item.reviewerName || "",
    text: item.text,
    annotations: item.annotations,
    context: item.context,
    imageSize: { width: item.image.width, height: item.image.height },
  }
}

// Phase 1 "send": save one self-contained HTML report to the reviewer's
// computer. A single download avoids browsers silently blocking a second one.
export async function downloadFeedback(item) {
  const sidecar = feedbackSidecar(item)
  const stamp = sidecar.createdAt.replace(/[:.]/g, "-")
  const png = await flattenToPng({
    imageUrl: item.image.url,
    imageSize: sidecar.imageSize,
    annotations: item.annotations,
  })
  const imageDataUrl = await blobToDataUrl(png)
  const html = feedbackReportHtml({ sidecar, imageDataUrl })
  download(
    new Blob([html], { type: "text/html" }),
    `feedback-${item.key}-${stamp}.html`,
  )
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatLines(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return "none recorded"
  return lines
    .map(({ from, to, program }) => {
      const range = from === to ? `line ${from}` : `lines ${from}-${to}`
      return program ? `${program}: ${range}` : range
    })
    .join("; ")
}

function show(value) {
  return value === null || value === undefined || value === ""
    ? "unknown"
    : value
}

// A complete HTML document holding the flattened screenshot, the text, the
// context, and the full sidecar as JSON (in #feedback-sidecar) for tooling.
export function feedbackReportHtml({ sidecar, imageDataUrl }) {
  const context = sidecar.context || {}
  const viewport = context.viewport
    ? `${context.viewport.width} x ${context.viewport.height}`
    : null
  const variables = Object.entries(context.variables || {})
  const title = `Feedback for ${sidecar.key} (${sidecar.mode}) at ${sidecar.createdAt}`
  const json = JSON.stringify(sidecar, null, 2).replace(/</g, "\\u003c")

  const fields = [
    ["Program lines on screen", formatLines(context.lines)],
    ["Run id", show(context.runId)],
    ["Program name", show(context.programName)],
    ["Node id", show(context.nodeId)],
    ["Viewport", show(viewport)],
    ["User agent", show(context.userAgent)],
  ]

  const variableRows = variables
    .map(
      ([name, value]) =>
        `<tr><td>${escapeHtml(name)}</td><td>${escapeHtml(JSON.stringify(value) ?? "undefined")}</td></tr>`,
    )
    .join("\n")

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
body { font: 15px/1.5 system-ui, sans-serif; margin: 24px auto; max-width: 1100px; padding: 0 16px; color: #222; }
img { max-width: 100%; height: auto; border: 1px solid #ccc; }
pre { white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 6px; }
table { border-collapse: collapse; }
td, th { border: 1px solid #ddd; padding: 4px 8px; text-align: left; vertical-align: top; }
td:last-child { font-family: monospace; word-break: break-all; }
dt { font-weight: 600; }
dd { margin: 0 0 8px; word-break: break-word; }
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
${sidecar.reviewerName ? `<p>Reviewer: ${escapeHtml(sidecar.reviewerName)}</p>\n` : ""}<h2>Feedback</h2>
<pre>${escapeHtml(sidecar.text || "")}</pre>
<h2>Screenshot</h2>
<p><img src="${escapeHtml(imageDataUrl)}" alt="Annotated screenshot"></p>
<p>To keep the PNG, right-click the image and save it.</p>
<h2>Context</h2>
<dl>
${fields.map(([label, value]) => `<dt>${label}</dt><dd>${escapeHtml(value)}</dd>`).join("\n")}
</dl>
<h3>Variables</h3>
${context.variablesTruncated ? "<p>The variable list was truncated because it was too large.</p>\n" : ""}${variables.length ? `<table>\n<tr><th>Name</th><th>Value</th></tr>\n${variableRows}\n</table>` : "<p>None recorded.</p>"}
<script type="application/json" id="feedback-sidecar">
${json}
</script>
</body>
</html>
`
}

export function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}
