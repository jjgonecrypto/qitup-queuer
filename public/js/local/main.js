(function() {

  require.config({
    baseUrl: "/js/local",
    paths: {
      text: "/js/3rd/require.text",
      jquery: "/js/3rd/jquery-1.8.2.min",
      underscore: "/js/3rd/underscore.min",
      Backbone: "/js/3rd/backbone.min"
    },
    shim: {
      underscore: {
        deps: ["jquery"],
        exports: "_"
      },
      Backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      }
    }
  });

  define(["jquery", "underscore", "Backbone", "./Router"], function($, _, Backbone, Router) {
    return $(function() {
      new Router().on('viewChange', function(klazz, name, action) {
        return new klazz({
          el: 'body'
        }).render();
      });
      return Backbone.history.start();
    });
  });

}).call(this);