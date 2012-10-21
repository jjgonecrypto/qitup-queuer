(function() {

  define(["Backbone", "underscore", "text!./home.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {},
      render: function() {
        this.$el.html(_.template(viewTemplate));
        return this;
      }
    });
  });

}).call(this);
