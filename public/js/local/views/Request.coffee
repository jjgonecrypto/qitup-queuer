define ["Backbone", "underscore", "text!./request.html", "collections/entries"], (Backbone, _, viewTemplate, entries) ->
  Backbone.View.extend
    initialize: ->
      @item = entries.findBy(@options.action) or spotify.lookup(@options.action)

    render: ->
      @$el.html _.template(viewTemplate, item: @item.toJSON())
      @