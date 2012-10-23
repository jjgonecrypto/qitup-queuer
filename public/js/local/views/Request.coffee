define [
  "Backbone"
  "underscore"
  "collections/entries"
  "models/entry"
  "views/requests/Track"
  "views/requests/Artist"
  "views/requests/Album"
], (Backbone, _, entries, entry, Track, Artist, Album) ->
  Backbone.View.extend
    initialize: ->
      @item = entries.findBy(@options.action)
      return if @item
      entry.loadBy @options.action, (item) => 
        @item = item
        @render()

    render: ->
      return @ unless @item
      type = @item.get "type"
      klazz = if type is "artist" then Artist else if type is "album" then Album else Track
      @$el.html new klazz(item: @item).render().el
      @