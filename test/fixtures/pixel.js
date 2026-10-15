// Test-only helper: read one pixel (and the size) of an image blob.
export async function pixelAt(blob, x, y) {
  const bitmap = await createImageBitmap(blob)
  const canvas = document.createElement("canvas")
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const context = canvas.getContext("2d")
  context.drawImage(bitmap, 0, 0)
  const [r, g, b, a] = context.getImageData(x, y, 1, 1).data
  return { r, g, b, a, width: bitmap.width, height: bitmap.height }
}
