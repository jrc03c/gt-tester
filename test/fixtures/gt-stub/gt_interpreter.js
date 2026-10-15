;(function () {
  var $ = window.jQuery
  var container = document.querySelector(".program_container")
  var main = container.querySelector(".main")
  var key = container.id

  var pages = [
    {
      lines: [
        { from: 1, to: 3, program: "main" },
        { from: 10, to: 12, program: "main" },
      ],
      html: '<p>Welcome to the stub program.</p><button class="btn next" type="button">Next</button>',
    },
    {
      lines: [{ from: 20, to: 24, program: "helper" }],
      html: "<p>Second page.</p><p>Thanks!</p>",
    },
  ]

  window.data = {
    get: function (field) {
      return { run_id: "run-123", current_program_name: "main" }[field]
    },
    node: function () {
      return "node-abc"
    },
    export_heap: function () {
      return { name: "Alice", score: 42 }
    },
  }

  function show(index) {
    var page = pages[index]
    $(window).trigger("guidedtrack:pageStart")
    main.innerHTML = page.html
    page.lines.forEach(function (line) {
      $(window).trigger("guidedtrack:trace", { detail: line })
    })
    $(window).trigger("guidedtrack:append")
    var next = main.querySelector(".next")
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1)
      })
    }
    setTimeout(function () {
      $(window).trigger("guidedtrack:pageEnd")
    }, 0)
  }

  if (key === "refused") {
    main.innerHTML =
      '<div class="loading-message">This page is not set up to run this program.</div>'
    return
  }

  main.setAttribute("data-stub-mode", container.dataset.mode || "")
  setTimeout(function () {
    show(0)
  }, 0)
})()
