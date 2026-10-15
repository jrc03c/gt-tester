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

// Phase 1 "send": save the flattened PNG and a JSON sidecar to the reviewer's computer.
export async function downloadFeedback(item) {
  const sidecar = feedbackSidecar(item)
  const stamp = sidecar.createdAt.replace(/[:.]/g, "-")
  const png = await flattenToPng({
    imageUrl: item.image.url,
    imageSize: sidecar.imageSize,
    annotations: item.annotations,
  })
  download(png, `feedback-${item.key}-${stamp}.png`)
  download(
    new Blob([JSON.stringify(sidecar, null, 2)], { type: "application/json" }),
    `feedback-${item.key}-${stamp}.json`,
  )
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
