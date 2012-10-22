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
    uri = "http://ws.spotify.com/search/1/#{type}.json?#{query}"
    @lastQuery = query
    run.call @, uri, callback

  lookup: (href, callback) ->
    clear()    
    uri = "http://ws.spotify.com/lookup/1/.json?uri=#{href}"
    run.call @, uri, callback