define [], () ->
  clear = (query) -> 
    @lastRequest.abort() if @lastRequest and (not query or @lastQuery is query)
  
  run = (uri, callback) ->
    console.log "GET #{uri}"
    @lastRequest = $.ajax(url: uri)
    .done((data) -> callback null, data)
    .fail((req, err) -> callback err)
    .always(() => @lastRequest = null)

  load: (query, type, callback) ->
    clear query
    url = "http://ws.spotify.com/search/1/#{type}.json?#{query}"
    @lastQuery = query
    run.call @, url, callback

  lookup: (href, callback) ->
    clear()    
    url = "http://ws.spotify.com/lookup/1/.json?uri=#{href}"
    run.call @, url, callback