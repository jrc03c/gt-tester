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

  // NOTE: I added this extra little event because I needed a way to ensure that
  // (e.g.) sliders selections would have the right value before submission,
  // even if the user accidentally changed them.
  $(window).trigger("before-submit-responses")

  $(button).click()
}

export { submitResponses }
