define ["Backbone", "underscore", "text!./album.html"], (Backbone, _, viewTemplate) ->
  Backbone.View.extend
    initialize: ->
      @album = @options.item

    render: ->
      @$el.html _.template(viewTemplate, album: @album.toJSON())
      @