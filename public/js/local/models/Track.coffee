define ['Backbone'], (Backbone) ->
  Backbone.Model.extend
    defaults:
      name: ""
      href: ""
      artist: ""
      album: ""
      length: 1
      type: "track"