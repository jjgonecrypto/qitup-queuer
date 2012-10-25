define ["Backbone", "underscore", "text!./album.html", "services/qitup", "text!lib/twitter-script.html"]
, (Backbone, _, viewTemplate, qitup, twitterScript) ->
  Backbone.View.extend
    initialize: ->
      @album = @options.item

    render: ->
      @$el.html _.template(viewTemplate, album: @album.toJSON(), queue: qitup.queue(), url: qitup.href())
      @$el.append twitterScript
      @