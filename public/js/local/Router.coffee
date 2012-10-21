define ["views/Home"], (Home) ->
  Backbone.Router.extend

    routes:
      ":name/:action":  "goto"
      ":name":  "goto"
      "": "goto"

    initialize: (options) ->
      @views = 
        home: Home

    goto: (name, action) ->
      klazz = @views[name] ? @views.home
      @trigger 'viewChange', klazz, name, action