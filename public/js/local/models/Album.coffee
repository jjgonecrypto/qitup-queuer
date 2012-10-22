define ['Backbone'], (Backbone) ->
  Backbone.Model.extend
    defaults:
      name: ""
      href: ""
      artist: ""
      type: "album"