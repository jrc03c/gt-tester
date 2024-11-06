async function submitResponses() {
  console.log("submitting responses...")

  let defaultButtons = Array.from(
    document.getElementsByClassName("btn-default"),
  )

  let primaryButtons = Array.from(
    document.getElementsByClassName("btn-primary"),
  )

  if (defaultButtons.length === 0 && primaryButtons.length === 0) {
    console.warn("No 'submit' buttons were found!")
    return
  }

  const button =
    defaultButtons.length > 0
      ? defaultButtons[defaultButtons.length - 1]
      : primaryButtons[primaryButtons.length - 1]

  $(button).click()
}

export { submitResponses }
