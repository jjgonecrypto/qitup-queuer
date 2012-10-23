(function() {

  define(["Backbone", "underscore", "text!./track.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {
        return this.track = this.options.item;
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          track: this.track
        }));
        return this;
      }
    });
  });

}).call(this);
