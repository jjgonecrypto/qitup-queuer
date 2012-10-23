(function() {

  define(["Backbone", "underscore", "text!./album.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {
        return this.album = this.options.item;
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          album: this.album.toJSON()
        }));
        return this;
      }
    });
  });

}).call(this);
