function getTextInputElements(container) {
  if (typeof container === "undefined") {
    container = document.body
  }

  const out = []
  const tagName = container.tagName.toLowerCase()

  if (tagName === "input" && container.getAttribute("type") === "text") {
    out.push(container)
  }

  if (tagName === "textarea") {
    out.push(container)
  }

  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i]
    const results = getTextInputElements(child)
    results.forEach(el => out.push(el))
  }

  return out
}

export { getTextInputElements }
