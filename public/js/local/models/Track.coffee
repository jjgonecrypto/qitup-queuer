define [], () ->
  Backbone.Model.extend
    defaults:
      name: ""
      href: ""
      artist: ""
      album: ""
      length: 1