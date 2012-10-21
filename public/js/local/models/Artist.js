(function() {

  define([], function() {
    return Backbone.Model.extend({
      defaults: {
        name: "",
        href: ""
      }
    });
  });

}).call(this);
