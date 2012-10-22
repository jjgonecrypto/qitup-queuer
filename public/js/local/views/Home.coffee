define [
  "Backbone"
  "underscore"
  "eventbus"
  "text!./home.html"
  "collections/entries"
  "views/Search"
  "views/Results"
  "collections/Tracks"
  "collections/Artists"
  "collections/Albums" 
], (Backbone, _, bus, viewTemplate, entries, Search, Results, Tracks, Artists, Albums) ->
  Backbone.View.extend 
    initialize: ->
      entries.set 
        tracks: new Tracks()
        artists: new Artists()
        albums: new Albums() 

    render: ->
      @$el.html _.template(viewTemplate)
      @$('.search').html new Search(entries: entries).render().el
      @$('.results').html new Results(entries: entries).render().el
      @