import { pause } from "@jrc03c/pause"

function remap(x, a, b, c, d) {
  return c + ((d - c) * (x - a)) / (b - a)
}

async function selectSliderValue(value, selector) {
  console.log("selecting slider value:", value)

  selector = selector || ".slider"
  let slider = document.querySelector(selector)

  while (!slider) {
    await pause(100)
    slider = document.querySelector(selector)
  }

  let handle = slider.querySelector(".slider-handle")

  while (!handle) {
    await pause(100)
    handle = slider.querySelector(".slider-handle")
  }

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

  const tooltip = slider.querySelector(".tooltip")
  const tooltipInner = tooltip.querySelector(".tooltip-inner")
  const sliderSelection = slider.querySelector(".slider-selection")
  const sliderTrackHigh = slider.querySelector(".slider-track-high")

  const percent = (100 * (value - min)) / (max - min)
  handle.style.left = percent.toFixed(2) + "%"
  tooltip.style.left = percent.toFixed(2) + "%"
  sliderSelection.style.width = percent.toFixed(2) + "%"
  sliderTrackHigh.width = (100 - percent).toFixed(2) + "%"
  tooltipInner.textContent = value.toFixed(2)

  const callback = () => {
    try {
      slider.dispatchEvent(
        new MouseEvent("mousedown", { clientX: x, clientY: y }),
      )
    } catch (e) {}

    $(window).off("before-submit-responses", callback)
  }

  $(window).on("before-submit-responses", callback)
}

export { selectSliderValue }
