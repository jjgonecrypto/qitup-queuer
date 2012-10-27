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
  "services/qitup"
], (Backbone, _, bus, viewTemplate, entries, Search, Results, Tracks, Artists, Albums, qitup) ->
  Backbone.View.extend 
    initialize: ->
      entries.set 
        tracks: new Tracks()
        artists: new Artists()
        albums: new Albums() 

      qitup.preserve() #save facebook token if exists

    render: ->
      url = "http://live.qitup.fm?q=qituptest" or qitup.href()
      @$el.html _.template(viewTemplate, url: url, facebookAppID: "504698779547671")
      @$('.search').html new Search(entries: entries).render().el
      @$('.results').html new Results(entries: entries).render().el
      @