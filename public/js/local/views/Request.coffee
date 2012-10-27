define [
  "Backbone"
  "underscore"
  "collections/entries"
  "models/entry"
  "services/qitup"
  "text!lib/twitter-button.html"
  "text!lib/facebook-button.html"
], (Backbone, _, entries, entry, qitup, twitter, facebook) ->
  i = 0
  requests = (type, item) ->
    template = (req) -> _.template(type, url: qitup.href(), i: i++, queue: qitup.queue(), request: req)  
    actions = (prefix = "") ->
      artist:
        random: template prefix + 'Play anything by "' + (item.artist ? item.name) + '"'
        top: template prefix + 'Play artist "' + (item.artist ? item.name) + '"'
      track: template prefix + 'Play "' + item.name + '" by "' + item.artist + '"'
      album:
        random: template prefix + 'Play anything from "' + item.name + '" by "' + item.artist + '"'
        top: template prefix + 'Play from "' + item.name + '" by "' + item.artist + '"'
    
    if type is twitter then actions "@qitupfm " else actions()

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
        html = _.template(template, twitter: requests(twitter, @item.toJSON()), facebook: requests(facebook, @item.toJSON()), item: @item.toJSON(), queue: qitup.queue(), url: qitup.href())
        @$el.html html
      @