(function() {

  define(["views/Home", "views/Request"], function(Home, Request) {
    return Backbone.Router.extend({
      routes: {
        ":name/:action": "goto",
        ":name": "goto",
        "": "goto"
      },
      initialize: function(options) {
        return this.views = {
          home: Home,
          request: Request
        };
      },
      goto: function(name, action) {
        var klazz, _ref;
        klazz = (_ref = this.views[name]) != null ? _ref : this.views.home;
        return this.trigger('viewChange', klazz, name, action);
      }
    });
  });

}).call(this);
