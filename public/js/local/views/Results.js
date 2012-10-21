(function() {

  define(["Backbone", "underscore", 'text!./results.html'], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {
        var _this = this;
        this.query = void 0;
        this.entries = this.options.entries;
        this.entries.on("loaded", function() {
          return _this.render();
        });
        return this.query = "temp!";
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          entries: {
            tracks: this.entries.tracks.toJSON(),
            artists: this.entries.artists.toJSON(),
            albums: this.entries.albums.toJSON(),
            query: this.query
          }
        }));
        return this;
      }
    });
  });

}).call(this);
