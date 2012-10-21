define [
  "Backbone"
  "underscore"
  "text!./home.html"
  "collections/entries"
  "views/Search"
  "collections/Tracks"
  "collections/Artists"
  "collections/Albums" 
], (Backbone, _, viewTemplate, entries, Search, Tracks, Artists, Albums) ->
  Backbone.View.extend 
    initialize: ->
      entries.set 
        tracks: new Tracks()
        artists: new Artists()
        albums: new Albums() 

    render: ->
      @$el.html _.template(viewTemplate)
      @$('.search').html new Search(entries: entries).render().el
      @