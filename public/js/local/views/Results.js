(function() {

  define(["Backbone", "underscore", 'text!./results.html', "eventbus"], function(Backbone, _, viewTemplate, bus) {
    return Backbone.View.extend({
      initialize: function() {
        var _this = this;
        this.query = void 0;
        this.entries = this.options.entries;
        this.entries.on("loaded", function() {
          return _this.render();
        });
        return bus.on("search:query", function(query) {
          return _this.query = query;
        });
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
      },
      show: function(evt) {
        return console.log($(evt.target).data("href"));
      },
      events: {
        'click  .track': 'show',
        'click  .artist': 'show',
        'click  .album': 'show'
      }
    });
  });

}).call(this);
