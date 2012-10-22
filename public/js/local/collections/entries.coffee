define ["Backbone", "underscore"], (Backbone, _) ->
  
  dispatcher = _.extend({}, Backbone.Events)
    
  dispatcher.loadBy = (query, done) ->
    @tracks.load query, (err) =>
      console.log(err) if err
      @artists.load query, (err) =>
        console.log(err) if err
        @albums.load query, (err) =>
          console.log(err) if err
          done()

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