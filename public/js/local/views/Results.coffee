define ["Backbone", "underscore", 'text!./results.html'], (Backbone, _, viewTemplate) ->
  Backbone.View.extend
    initialize: ->
      @query = undefined
      @entries = @options.entries
      @entries.on "loaded", () => @render()
      #bus.on "search:query", (query) => @query = query
      @query = "temp!" #temp!
      
    render: ->
      @$el.html _.template viewTemplate, 
        entries: 
          tracks: @entries.tracks.toJSON()
          artists: @entries.artists.toJSON()
          albums: @entries.albums.toJSON()
          query: @query
      @