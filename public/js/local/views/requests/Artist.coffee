define ["Backbone", "underscore", "text!./artist.html"], (Backbone, _, viewTemplate) ->
  Backbone.View.extend
    initialize: ->
      @artist = @options.item

    render: ->
      @$el.html _.template(viewTemplate, artist: @artist.toJSON())
      @