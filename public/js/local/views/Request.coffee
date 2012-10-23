define [
  "Backbone"
  "underscore"
  "text!./request.html"
  "collections/entries"
  "models/entry"
  "views/requests/track"
  "views/requests/artist"
  "views/requests/album"
], (Backbone, _, viewTemplate, entries, entry, Track, Artist, Album) ->
  Backbone.View.extend
    initialize: ->
      @item = entries.findBy(@options.action)
      return if @item
      entry.loadBy @options.action, (item) => 
        @item = item
        @render()

    render: ->
      type = @item.get "type"
      klazz = if type is "artist" then Artist else if type if "album" then Album else Track
      @$el.html new klazz(item: @item).render().el
      @