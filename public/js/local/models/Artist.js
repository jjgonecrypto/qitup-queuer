(function() {

  define(['Backbone'], function(Backbone) {
    return Backbone.Model.extend({
      defaults: {
        name: "",
        href: ""
      }
    });
  });

}).call(this);
