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
      random: templatize '@qitupfm Play anything by "' + (item.artist ? item.name) + '"'
      top: templatize '@qitupfm Play artist "' + (item.artist ? item.name) + '"'
    track: templatize '@qitupfm Play "' + item.name + '" by "' + item.artist + '"'
    album:
      random: templatize '@qitupfm Play anything from "' + item.name + '" by "' + item.artist + '"'
      top: templatize '@qitupfm Play from "' + item.name + '" by "' + item.artist + '"'

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