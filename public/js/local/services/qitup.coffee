define [], () ->
  exports = 
    queue: () ->
      parts = window.location.search.match(/(?:\&q\=|\?q\=)[^&|^$]+/)
      return "" unless parts?.length
      parts[0].substr(3)

    href: () -> 
      window.location.origin + window.location.pathname + window.location.search