require.config
  baseUrl: "/js/local"
  paths: 
    text: "/js/3rd/require.text"
    jquery: "/js/3rd/jquery-1.8.2.min"
    underscore: "/js/3rd/underscore.min"
    Backbone: "/js/3rd/backbone.min"
  shim:
    underscore:
      deps: ["jquery"]
      exports: "_"
    Backbone: 
      deps: ["underscore", "jquery"]
      exports: "Backbone"

define ["jquery", "underscore", "Backbone", "./Router", "views/Facebook"], ($, _, Backbone, Router, FacebookView) ->
  $ ->
    new Router().on 'viewChange', (klazz, name, action) ->
      new klazz
        el: '.content'
        action: action
      .render()  

    new FacebookView
      el: '.facebook'
    .render()

    Backbone.history.start()