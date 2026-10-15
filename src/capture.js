import { domToCanvas } from "modern-screenshot"

export const CHROME_SELECTOR = "[data-harness-chrome]"

export async function captureViewport({
  scale = Math.min(window.devicePixelRatio || 1, 2),
  exclude = CHROME_SELECTOR,
  quality = 0.85,
} = {}) {
  const root = document.documentElement
  const full = await domToCanvas(root, {
    scale,
    backgroundColor: "#ffffff",
    width: root.scrollWidth,
    height: root.scrollHeight,
    filter: node => !(node instanceof Element && node.matches(exclude)),
  })

  const width = Math.round(window.innerWidth * scale)
  const height = Math.round(window.innerHeight * scale)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")
  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, width, height)
  context.drawImage(
    full,
    Math.round(window.scrollX * scale),
    Math.round(window.scrollY * scale),
    width,
    height,
    0,
    0,
    width,
    height,
  )

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      result =>
        result
          ? resolve(result)
          : reject(new Error("Could not encode screenshot")),
      "image/webp",
      quality,
    )
  })

  return { blob, url: URL.createObjectURL(blob), width, height, scale }
}
