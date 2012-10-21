define ["Backbone", "underscore", "text!./container.html"], (Backbone, _, viewTemplate) ->
  Backbone.View.extend 
    initialize: ->

    render: ->
      @$el.html _.template(viewTemplate)
      @