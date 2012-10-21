(function() {

  define(["Backbone", "underscore"], function(Backbone, _) {
    var dispatcher;
    dispatcher = _.extend({}, Backbone.Events);
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
    return dispatcher;
  });

}).call(this);
