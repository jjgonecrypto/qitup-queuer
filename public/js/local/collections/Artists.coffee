define ['Backbone', 'models/Artist', 'services/spotify'], (Backbone, Artist, spotify) ->
  Backbone.Collection.extend
    model: Artist
    type: "artist"

    initialize: ->
        
    load: (query, callback) ->
      spotify.load query, @type, (err, data) =>
        return callback(err) if err
        @reset() 
        top5 = _.first(data.artists, 5)
        _.each top5, (entry) =>
          @add 
            name: entry.name
            href: entry.href
        @trigger "loaded"
        callback()