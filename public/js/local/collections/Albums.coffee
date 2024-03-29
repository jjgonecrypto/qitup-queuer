define ['Backbone', 'models/Album', 'services/spotify'], (Backbone, Album, spotify) ->
  Backbone.Collection.extend
    model: Album
    type: "album"

    initialize: ->

    load: (query, callback) ->

      spotify.load query, @type, (err, data) =>
        return callback(err) if err

        @reset() 

        top5 = _.first(data.albums, 5)
        _.each top5, (entry) =>
          @add 
            name: entry.name
            href: entry.href
            artist: entry.artists?[0]?.name ? ''
        @trigger "loaded"
        callback()