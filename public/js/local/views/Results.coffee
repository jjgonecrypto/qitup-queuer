define ["Backbone", "underscore", 'text!./results.html', "eventbus"], (Backbone, _, viewTemplate, bus) ->
  Backbone.View.extend
    initialize: ->
      @query = undefined
      @entries = @options.entries
      @entries.on "loaded", () => @render()
      bus.on "search:query", (query) => @query = query

    render: ->
      @$el.html _.template viewTemplate, 
        entries: 
          tracks: @entries.tracks.toJSON()
          artists: @entries.artists.toJSON()
          albums: @entries.albums.toJSON()
          query: @query
      @

    show: (evt) ->
      found = @entries.findBy $(evt.target).data("href")

      bus.trigger "view:track"


    events:
      'click  .track'   : 'show'
      'click  .artist'  : 'show'
      'click  .album'   : 'show'