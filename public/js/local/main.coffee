require.config
  baseUrl: "/js/local"
  paths: 
    jquery: "/js/3rd/jquery-1.8.2.min"
    underscore: "/js/3rd/underscore.min"
    Backbone: "/js/3rd/backbone.min"
  shim:
    Backbone: 
      deps: ["underscore", "jquery"]
      exports: "Backbone"

define ["jquery", "underscore", "Backbone"], ($, _, Backbone) ->
  $ ->
    $("body").html "welcome to the app"
    