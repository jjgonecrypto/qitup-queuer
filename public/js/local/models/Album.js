(function() {

  define([], function() {
    return Backbone.Model.extend({
      defaults: {
        name: "",
        href: "",
        artist: ""
      }
    });
  });

}).call(this);
