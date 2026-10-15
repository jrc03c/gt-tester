;(function () {
  var handlers = {}

  function jQuery() {
    return {
      on: function (name, fn) {
        ;(handlers[name] = handlers[name] || []).push(fn)
        return this
      },
      one: function (name, fn) {
        var self = this
        var wrapped = function () {
          self.off(name, wrapped)
          fn.apply(null, arguments)
        }
        return this.on(name, wrapped)
      },
      off: function (name, fn) {
        if (!fn) {
          delete handlers[name]
          return this
        }
        handlers[name] = (handlers[name] || []).filter(function (h) {
          return h !== fn
        })
        return this
      },
      trigger: function (name, data) {
        var list = (handlers[name] || []).slice()
        var event = { type: name }
        list.forEach(function (fn) {
          fn(event, data)
        })
        return this
      },
    }
  }

  window.jQuery = window.$ = jQuery
})()
