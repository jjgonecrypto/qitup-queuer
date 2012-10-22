define ["views/Home", "views/Request"], (Home, Request) ->
  Backbone.Router.extend

    routes:
      ":name/:action":  "goto"
      ":name":  "goto"
      "": "goto"

    initialize: (options) ->
      @views = 
        home: Home
        request: Request

    goto: (name, action) ->
      klazz = @views[name] ? @views.home
      @trigger 'viewChange', klazz, name, action