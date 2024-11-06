import { getElementContainingText } from "../utils/get-element-containing-text.mjs"

async function click(value, classname) {
  if (value) value = value.toString()

  let errorMessage = "No clickable elements were found"
  if (value) errorMessage += ` containing the value "${value}"`
  if (classname) errorMessage += ` with class "${classname}"`
  errorMessage += "!"

  let options = []

  if (classname) {
    const els = Array.from(document.getElementsByClassName(classname))
    options = options.concat(els)
  } else if (value) {
    const el = getElementContainingText(value)
    if (el) options.push(el)
  }

  if (options.length === 0) {
    console.warn(errorMessage)
    return
  }

  if (value) {
    options = options.filter(el => el.textContent.includes(value))
  }

  if (options.length > 0) {
    const input = options[0]
    $(input).trigger("click")

    console.log(
      [
        "clicking on element",
        value ? `containing value "${value}"` : "",
        classname ? `with class "${classname}"` : "",
      ]
        .join(" ")
        .trim() + "...",
    )
  } else {
    console.warn(errorMessage)
    return
  }
}

export { click }
