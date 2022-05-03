const pause = require("./pause.js")
const getTextInputElements = require("./get-text-input-elements.js")

async function emitTyping(event, data) {
  await pause(500)

  const { values } = data
  const timeout = 100
  const textInputElements = getTextInputElements()

  if (values.length !== textInputElements.length) {
    console.log(
      `Note that the number of values you passed to the 'gt-tester-type' event is different from the number of text fields available! (${values.length} values vs. ${textInputElements.length} text fields)`
    )
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i].toString()
    const el = textInputElements[i]
    el.value = value
    $(el).trigger("input")
    await pause(timeout)
  }

  $(".answer_submit").click()
}

module.exports = emitTyping
