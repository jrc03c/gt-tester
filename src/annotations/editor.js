import {
  CALLOUT_DEFAULTS,
  clampBox,
  clampPoint,
  clone,
  createCallout,
  createHistory,
  createStroke,
  thinPath,
  translateShape,
} from "./model.js"
import { SVG_NS, renderTree, toDom } from "./render.js"

export const TOOLS = ["select", "pen", "highlight", "callout"]

export function createEditor({
  container,
  image,
  annotations = [],
  onChange = () => {},
}) {
  let state = clone(annotations)
  let tool = "select"
  let selectedId = null
  let draft = null
  let drag = null
  let textDirty = false
  const history = createHistory(state)

  container.classList.add("harness-annotator")
  container.innerHTML = ""
  container.tabIndex = 0

  const img = document.createElement("img")
  img.src = image.url
  img.width = image.width
  img.height = image.height
  img.alt = "Screenshot"
  img.draggable = false
  container.appendChild(img)

  const svg = document.createElementNS(SVG_NS, "svg")
  svg.classList.add("harness-annotator-svg")
  container.appendChild(svg)

  function render() {
    const tree = toDom(
      renderTree(state, image, { mode: "live", selectedId, draft }),
    )
    svg.setAttribute("viewBox", tree.getAttribute("viewBox"))
    svg.setAttribute("data-tool", tool)
    svg.replaceChildren(...Array.from(tree.childNodes))
  }

  function toImagePoint(event) {
    const rect = svg.getBoundingClientRect()
    return [
      ((event.clientX - rect.left) * image.width) / rect.width,
      ((event.clientY - rect.top) * image.height) / rect.height,
    ]
  }

  function roleOf(target) {
    return target && target.getAttribute
      ? target.getAttribute("data-role")
      : null
  }

  function find(id) {
    return state.find(shape => shape.id === id)
  }

  function replace(shape) {
    state = state.map(existing => (existing.id === shape.id ? shape : existing))
  }

  function commit() {
    history.push(state)
    onChange(clone(state))
  }

  function isEditingText() {
    return roleOf(document.activeElement) === "text"
  }

  function focusText(id) {
    const text = svg.querySelector(`[data-id="${id}"] [data-role="text"]`)
    if (text) text.focus()
  }

  function onPointerDown(event) {
    if (event.button !== 0) return
    const role = roleOf(event.target)
    if (role === "text") return
    container.focus({ preventScroll: true })
    const point = toImagePoint(event)

    if (tool === "pen" || tool === "highlight") {
      draft = createStroke(tool, [point])
      svg.setPointerCapture(event.pointerId)
      render()
      event.preventDefault()
      return
    }

    if (tool === "callout") {
      const callout = createCallout(clampPoint(point, image), image)
      state = [...state, callout]
      selectedId = callout.id
      commit()
      render()
      focusText(callout.id)
      event.preventDefault()
      return
    }

    const group = event.target.closest
      ? event.target.closest("[data-id]")
      : null
    if (!group) {
      selectedId = null
      render()
      return
    }

    selectedId = group.getAttribute("data-id")
    drag = { role: role || "shape", last: point, moved: false }
    svg.setPointerCapture(event.pointerId)
    render()
    event.preventDefault()
  }

  function onPointerMove(event) {
    if (draft) {
      draft.points.push(toImagePoint(event))
      render()
      return
    }
    if (!drag) return

    const point = toImagePoint(event)
    const dx = point[0] - drag.last[0]
    const dy = point[1] - drag.last[1]
    drag.last = point
    drag.moved = true
    const shape = find(selectedId)
    if (!shape) return

    if (drag.role === "anchor") {
      replace({
        ...shape,
        anchor: clampPoint([shape.anchor[0] + dx, shape.anchor[1] + dy], image),
      })
    } else if (drag.role === "box") {
      replace({
        ...shape,
        box: clampBox(
          { ...shape.box, x: shape.box.x + dx, y: shape.box.y + dy },
          image,
        ),
      })
    } else if (drag.role === "resize") {
      replace({
        ...shape,
        box: clampBox(
          {
            ...shape.box,
            w: Math.max(CALLOUT_DEFAULTS.minWidth, shape.box.w + dx),
            h: Math.max(CALLOUT_DEFAULTS.minHeight, shape.box.h + dy),
          },
          image,
        ),
      })
    } else {
      replace(translateShape(shape, dx, dy))
    }
    render()
  }

  function onPointerUp() {
    if (draft) {
      state = [...state, { ...draft, points: thinPath(draft.points) }]
      draft = null
      commit()
      render()
      return
    }
    if (drag) {
      if (drag.moved) commit()
      drag = null
      render()
    }
  }

  function onInput(event) {
    if (roleOf(event.target) !== "text") return
    const id = event.target.closest("[data-id]").getAttribute("data-id")
    const shape = find(id)
    if (!shape) return
    replace({ ...shape, text: event.target.innerText.replace(/\n$/, "") })
    textDirty = true
    onChange(clone(state))
  }

  function onFocusOut(event) {
    if (roleOf(event.target) !== "text") return
    if (!textDirty) return
    textDirty = false
    commit()
    render()
  }

  function onKeyDown(event) {
    if (isEditingText()) return
    if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
      deleteSelected()
      event.preventDefault()
    } else if (
      event.key.toLowerCase() === "z" &&
      (event.ctrlKey || event.metaKey)
    ) {
      undo()
      event.preventDefault()
    }
  }

  function deleteSelected() {
    if (!selectedId) return
    state = state.filter(shape => shape.id !== selectedId)
    selectedId = null
    commit()
    render()
  }

  function undo() {
    const previous = history.undo()
    if (!previous) return
    state = previous
    selectedId = null
    draft = null
    drag = null
    onChange(clone(state))
    render()
  }

  svg.addEventListener("pointerdown", onPointerDown)
  svg.addEventListener("pointermove", onPointerMove)
  svg.addEventListener("pointerup", onPointerUp)
  svg.addEventListener("pointercancel", onPointerUp)
  svg.addEventListener("input", onInput)
  svg.addEventListener("focusout", onFocusOut)
  container.addEventListener("keydown", onKeyDown)
  render()

  return {
    setTool(next) {
      if (!TOOLS.includes(next)) throw new Error(`Unknown tool: ${next}`)
      tool = next
      render()
    },
    getTool: () => tool,
    getAnnotations: () => clone(state),
    getSelectedId: () => selectedId,
    deleteSelected,
    undo,
    destroy() {
      container.removeEventListener("keydown", onKeyDown)
      container.innerHTML = ""
      container.classList.remove("harness-annotator")
    },
  }
}
