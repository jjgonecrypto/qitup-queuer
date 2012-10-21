(function() {

  define(["Backbone", "underscore", "text!./container.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {},
      render: function() {
        this.$el.html(_.template(viewTemplate));
        return this;
      }
    });
  });

}).call(this);
