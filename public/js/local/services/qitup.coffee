define [], () ->
  cache = 
    facebook:
      accessToken: undefined

  findPart = (key, str) ->
    regex = new RegExp("(?:\\\&#{key}\\\=|\\\?#{key}\\\=|\\\##{key}\\\=)[^&|^$|^/]+")
    parts = str.match(regex)
    return "" unless parts?.length
    parts[0].substr(2 + key.length)

  exports = 
    queue: () -> findPart "q", window.location.search

    href: () -> 
      window.location.origin + window.location.pathname + window.location.search

    preserve: () ->
      token = findPart "access_token", window.location.hash
      cache.facebook.accessToken = token if token.length