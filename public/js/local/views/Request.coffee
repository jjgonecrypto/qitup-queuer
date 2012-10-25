define [
  "Backbone"
  "underscore"
  "collections/entries"
  "models/entry"
  "services/qitup"
  "text!lib/twitter-script.html"
], (Backbone, _, entries, entry, qitup, twitterScript) ->
  Backbone.View.extend
    initialize: ->
      @item = entries.findBy(@options.action)
      return if @item
      entry.loadBy @options.action, (item) => 
        @item = item
        @render()

    render: ->
      return @ unless @item
      type = @item.get "type"
      require ["text!views/requests/#{type}.html"], (template) =>
        @$el.html _.template(template, item: @item.toJSON(), queue: qitup.queue(), url: qitup.href())
        @$el.append twitterScript
      @