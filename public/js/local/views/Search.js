(function() {

  define(["Backbone", "underscore", "text!./search.html"], function(Backbone, _, viewTemplate) {
    return Backbone.View.extend({
      initialize: function() {
        this.lastQuery = void 0;
        return this.entries = this.options.entries;
      },
      render: function() {
        this.$el.html(viewTemplate);
        return this;
      },
      search: function(evt) {
        var query,
          _this = this;
        if (this.$(evt.target).val().length < 3 || this.lastQuery === this.$(evt.target).val()) {
          return;
        }
        query = this.$(evt.target).serialize();
        this.$('.loading').show();
        this.lastQuery = this.$(evt.target).val();
        return this.entries.tracks.load(query, function(err) {
          if (err) console.log(err);
          return _this.entries.artists.load(query, function(err) {
            if (err) console.log(err);
            return _this.entries.albums.load(query, function(err) {
              if (err) console.log(err);
              return _this.$('.loading').hide();
            });
          });
        });
      },
      events: {
        'keyup .spotify-lookup': 'search',
        'change .spotify-lookup': 'search'
      }
    });
  });

}).call(this);
