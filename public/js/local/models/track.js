(function() {

  define([], function() {
    return Backbone.Model.extend({
      defaults: {
        name: "",
        href: "",
        artist: "",
        album: "",
        length: 1
      }
    });
  });

}).call(this);
