define ["Backbone", "underscore", "text!./track.html"], (Backbone, _, viewTemplate) ->
  Backbone.View.extend
    initialize: ->
      @track = @options.item

    render: ->
      @$el.html _.template(viewTemplate, track: @track.toJSON())
      @