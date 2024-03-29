define ['Backbone', 'models/Track', 'services/spotify'], (Backbone, Track, spotify) ->
  Backbone.Collection.extend
    model: Track
    type: "track"
    
    initialize: ->

    load: (query, callback) ->
      spotify.load query, @type, (err, data) =>
        return callback(err) if err

        @reset() 

        top5 = _.first(data.tracks, 5)
        _.each top5, (entry) =>
          @add 
            name: entry.name
            href: entry.href
            artist: entry.artists?[0]?.name ? ''
            album: entry.album?.name ? ''
            length: entry.length
        @trigger "loaded"
        callback()