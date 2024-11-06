import { pause } from "@jrc03c/pause"

function remap(x, a, b, c, d) {
  return c + ((d - c) * (x - a)) / (b - a)
}

async function selectSliderValue(value, selector) {
  selector = selector || ".slider"
  let slider = document.querySelector(selector)
  let handle = slider.querySelector(".slider-handle")

  while (!slider || !handle) {
    console.log("waiting for slider and/or handle to appear...")
    await pause(100)
  }

  console.log("selecting slider value:", value)

  let min = handle.getAttribute("aria-valuemin")
  let max = handle.getAttribute("aria-valuemax")

  try {
    min = JSON.parse(min)
  } catch (e) {}

  try {
    max = JSON.parse(max)
  } catch (e) {}

  const sliderRect = slider.getBoundingClientRect()

  const x = remap(
    value,
    min,
    max,
    sliderRect.x,
    sliderRect.x + sliderRect.width,
  )

  const y = sliderRect.y + sliderRect.height / 2

  document.elementFromPoint(x, y).click()
}

export { selectSliderValue }
