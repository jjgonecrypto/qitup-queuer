define [], () ->
  cache = 
    facebook:
      access_token: undefined

  findPart = (key, str) ->
    regex = new RegExp("(?:\\\&#{key}\\\=|\\\?#{key}\\\=|\\\##{key}\\\=)[^&|^$|^/]+")
    parts = str.match(regex)
    return "" unless parts?.length
    parts[0].substr(2 + key.length)

  exports = 
    queue: () -> findPart "q", window.location.search

    href: () -> 
      return "http://live.qitup.fm"
      window.location.origin + window.location.pathname + window.location.search

    preserve: () ->
      token = findPart "access_token", window.location.hash
      if token.length
        cache.facebook.access_token = token 
        localStorage.setItem "facebook_access_token", token
      else
        cache.facebook.access_token = localStorage["facebook_access_token"]
    
    socialStatus: () ->
      facebook: exports.get("facebook.access_token")?.length > 0
      twitter: false

    get: (item) ->
      rCache = (container, chain) ->
        parts = chain.split('.')
        return container[parts[0]] if parts.length is 1
        rCache container[parts[0]], parts.slice(1).join('.')

      rCache cache, item  

    facebookLoginUri: () ->
      appID = "504698779547671"
      "https://www.facebook.com/dialog/oauth?client_id=#{appID}&redirect_uri=#{encodeURIComponent(exports.href())}&response_type=token&scope=publish_stream"