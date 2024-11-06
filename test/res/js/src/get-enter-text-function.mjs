import { getTextInputElements } from "./get-text-input-elements.mjs"

function getEnterTextFunction() {
  const textInputElements = getTextInputElements()

  return async function (text) {
    const textString = text.toString()

    if (textInputElements.length === 0) {
      console.warn(
        "No text input fields were found in which to put value:",
        textString,
      )

      return
    }

    const element = textInputElements[0]
    textInputElements.splice(0, 1)
    element.value = textString
    $(element).trigger("input")
    console.log("entering text:", textString)
  }
}

export { getEnterTextFunction }
