function getTextInputElements(container) {
  if (typeof container === "undefined") {
    container = document.body
  }

  const out = []

  const validTypes = [
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ]

  if (container.tagName) {
    const tagName = container.tagName.toLowerCase()

    if (tagName === "input") {
      const type = container.getAttribute("type")

      if (type && validTypes.indexOf(type.toLowerCase()) > -1) {
        out.push(container)
      }
    }

    if (tagName === "textarea") {
      out.push(container)
    }
  }

  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i]
    const childTextInputElements = getTextInputElements(child)
    childTextInputElements.forEach(el => out.push(el))
  }

  return out
}

module.exports = getTextInputElements
