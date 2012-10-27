define [
  "Backbone"
  "underscore"
  "eventbus"
  "text!./facebook.html"
  "services/qitup"
], (Backbone, _, bus, viewTemplate, qitup) ->
  Backbone.View.extend 
    initialize: ->
      qitup.preserve() #save facebook token if exists

    render: ->
      #url = "http://live.qitup.fm?q=qituptest" #testig only
      @$el.html _.template(viewTemplate, facebookLoginUri: qitup.facebookLoginUri(), status: qitup.socialStatus())
      @