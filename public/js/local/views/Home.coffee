define ["Backbone", "underscore", "text!./home.html"], (Backbone, _, viewTemplate) ->
  Backbone.View.extend 
    initialize: ->

    render: ->
      @$el.html _.template(viewTemplate)
      @