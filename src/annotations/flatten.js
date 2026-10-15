import { renderTree, toSvgString } from "./render.js"

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () =>
      reject(new Error(`Could not load image: ${url.slice(0, 80)}`))
    image.src = url
  })
}

export async function flattenToPng({ imageUrl, imageSize, annotations }) {
  const canvas = document.createElement("canvas")
  canvas.width = imageSize.width
  canvas.height = imageSize.height
  const context = canvas.getContext("2d")

  const base = await loadImage(imageUrl)
  context.drawImage(base, 0, 0, imageSize.width, imageSize.height)

  const svgString = toSvgString(
    renderTree(annotations, imageSize, { mode: "static" }),
  )
  const svgUrl = URL.createObjectURL(
    new Blob([svgString], { type: "image/svg+xml;charset=utf-8" }),
  )
  try {
    const overlay = await loadImage(svgUrl)
    context.drawImage(overlay, 0, 0)
  } finally {
    URL.revokeObjectURL(svgUrl)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob =>
        blob ? resolve(blob) : reject(new Error("Could not encode PNG")),
      "image/png",
    )
  })
}
