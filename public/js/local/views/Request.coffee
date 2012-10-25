define [
  "Backbone"
  "underscore"
  "collections/entries"
  "models/entry"
  "services/qitup"
  "text!lib/twitter-button.html"
], (Backbone, _, entries, entry, qitup, twitter) ->
  i = 0
  requests = (item) ->
    templatize = (req) -> _.template(twitter, url: qitup.href(), i: i++, queue: qitup.queue(), request: req)
    artist:
      random: templatize 'Play anything by "' + (item.artist ? item.name) + '"'
      top: templatize 'Play artist "' + (item.artist ? item.name) + '"'
    track: templatize 'Play "' + item.name + '" by "' + item.artist + '"'
    album:
      random: templatize 'Play anything from "' + item.name + '" by "' + item.artist + '"'
      top: templatize 'Play from "' + item.name + '" by "' + item.artist + '"'

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
        html = _.template(template, requests: requests(@item.toJSON()), item: @item.toJSON(), queue: qitup.queue(), url: qitup.href())
        @$el.html html
      @