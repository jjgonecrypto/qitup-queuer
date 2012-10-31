define [
  "jquery"
  "Backbone"
  "underscore"
  "collections/entries"
  "models/entry"
  "services/qitup"
  "text!lib/twitter-button.html"
  "text!lib/facebook-button.html"
], ($, Backbone, _, entries, entry, qitup, twitter, facebook) ->
  i = 0
  ajax = undefined
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

    onFacebookPost: (evt) -> 
      evt.preventDefault()
      return window.location.href = qitup.facebookLoginUri() if !qitup.get "facebook.access_token"
      return if ajax
      $(evt.target).attr("disabled", "disabled")
      ajax = $.ajax
        url: "https://graph.facebook.com/qitup/feed?method=POST&message=#{@$(evt.target).data("message")}&access_token=#{qitup.get("facebook.access_token")}" 
        dataType: "jsonp"
      .done (data) => 
        if data.error?.code is 190 and data.error?.error_subcode is 463
          window.location.href = qitup.facebookLoginUri() #expired so relogin to fbook
        else
          @$el.html "Requested successfully."
      .fail (err) -> 
        window.location.href = qitup.facebookLoginUri() #expired so relogin to fbook
      .always () ->
        $(evt.target).removeAttr("disabled")
        ajax = undefined

    events:
      'click .post-to-facebook': 'onFacebookPost'
