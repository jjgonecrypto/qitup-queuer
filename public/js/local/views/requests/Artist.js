(function() {

  define(["Backbone", "underscore", "text!./artist.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {
        return this.artist = this.options.item;
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          artist: this.artist
        }));
        return this;
      }
    });
  });

}).call(this);
