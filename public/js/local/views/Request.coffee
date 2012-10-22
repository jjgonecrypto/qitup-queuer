define ["Backbone", "underscore", "text!./request.html", "collections/entries", "models/entry"], (Backbone, _, viewTemplate, entries, entry) ->
  Backbone.View.extend
    initialize: ->
      @item = entries.findBy(@options.action)
      return if @item
      entry.loadBy @options.action, (item) => 
        @item = item
        @render()

    render: ->
      @$el.html _.template(viewTemplate, item: @item.toJSON()) if @item
      @