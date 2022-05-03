function getElementContainingText(text, container) {
  if (typeof container === "undefined") {
    container = document.body
  }

  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i]

    if (child.textContent.includes(text)) {
      return getElementContainingText(text, child)
    }
  }

  if (container.textContent.includes(text)) {
    return container
  }

  return null
}

module.exports = getElementContainingText
