define ["Backbone", "underscore"], (Backbone, _) ->
  
  dispatcher = _.extend({}, Backbone.Events)

  dispatcher.set = (collections) ->
    @tracks = collections.tracks
    @artists = collections.artists
    @albums = collections.albums

    @tracks.on "loaded", (evt) => @trigger "loaded"
    @artists.on "loaded", (evt) => @trigger "loaded"
    @albums.on "loaded", (evt) => @trigger "loaded"

  dispatcher.findBy = (href) ->
    attempt = (list) -> list.find (item) -> item.get("href") is href
    attempt(@tracks) or attempt(@artists) or attempt(@albums) 

  return dispatcher