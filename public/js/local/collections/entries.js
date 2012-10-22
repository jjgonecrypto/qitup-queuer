(function() {

  define(["Backbone", "underscore"], function(Backbone, _) {
    var dispatcher;
    dispatcher = _.extend({}, Backbone.Events);
    dispatcher.loadBy = function(query, done) {
      var _this = this;
      return this.tracks.load(query, function(err) {
        if (err) console.log(err);
        return _this.artists.load(query, function(err) {
          if (err) console.log(err);
          return _this.albums.load(query, function(err) {
            if (err) console.log(err);
            return done();
          });
        });
      });
    };
    dispatcher.set = function(collections) {
      var _this = this;
      this.tracks = collections.tracks;
      this.artists = collections.artists;
      this.albums = collections.albums;
      this.tracks.on("loaded", function(evt) {
        return _this.trigger("loaded");
      });
      this.artists.on("loaded", function(evt) {
        return _this.trigger("loaded");
      });
      return this.albums.on("loaded", function(evt) {
        return _this.trigger("loaded");
      });
    };
    dispatcher.findBy = function(href) {
      var attempt;
      attempt = function(list) {
        return list.find(function(item) {
          return item.get("href") === href;
        });
      };
      return attempt(this.tracks) || attempt(this.artists) || attempt(this.albums);
    };
    return dispatcher;
  });

}).call(this);
