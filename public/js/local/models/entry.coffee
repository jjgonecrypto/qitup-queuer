define ["Backbone", "underscore", "services/spotify", "models/Album", "models/Track", "models/Artist"]
, (Backbone, _, spotify, Album, Track, Artist) ->
  
  parse = (data) -> 
    name: data.name
    href: data.href
    artist: data.artists?[0]?.name ? ''
    album: data.album?.name ? ''
    length: data.length ? 0

  dispatcher = 
    loadBy: (href, done) ->
      spotify.lookup href, (err, data) ->
        type = href.split(':')[1]
        klazz = if type is "artist" then Artist else if type is "album" then Album else Track
        item = new klazz parse(data.track or data.artist or data.album)
        done item

  _.extend(dispatcher, Backbone.Events)