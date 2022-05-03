const pause = require("./pause.js")
const getElementContainingText = require("./get-element-containing-text.js")

async function emitClick(event, data) {
  await pause(500)

  const { values } = data
  const timeout = 500

  for (let i = 0; i < values.length; i++) {
    const value = values[i].toString()
    const el = getElementContainingText(value)
    $(el).click()
    await pause(timeout)
  }
}

module.exports = emitClick
