function getInteractiveElements(container) {
  if (typeof container === "undefined") {
    container = document.body
  }

  const validTags = ["input", "textarea"]

  const validClasses = [
    "answer",
    "slider-handle",
    "day",
    "timepicker-hour",
    "hour",
    "timepicker-minute",
    "minute",
  ]

  const out = []
  const tagName = container.tagName.toLowerCase()

  const classes = container.className
    .split(/\s/g)
    .map(c => c.trim())
    .filter(c => c.length > 0)

  const hasAValidClass = validClasses.some(c => classes.indexOf(c) > -1)
  const { width, height } = container.getBoundingClientRect()

  if (width > 0 && height > 0) {
    if (validTags.indexOf(tagName) > -1) {
      if (tagName === "input") {
        if (container.getAttribute("type") === "text") {
          out.push(container)
        }
      } else {
        out.push(container)
      }
    } else if (hasAValidClass) {
      out.push(container)
    }
  }

  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i]
    const results = getInteractiveElements(child)
    results.forEach(el => out.push(el))
  }

  return out
}

module.exports = getInteractiveElements
