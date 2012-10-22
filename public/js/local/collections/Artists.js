(function() {

  define(['Backbone', 'models/Artist', 'services/spotify'], function(Backbone, Artist, spotify) {
    return Backbone.Collection.extend({
      model: Artist,
      initialize: function() {},
      load: function(query, callback) {
        var _this = this;
        return spotify.load(query, 'artist', function(err, data) {
          var top5;
          if (err) return callback(err);
          _this.reset();
          top5 = _.first(data.artists, 5);
          _.each(top5, function(entry) {
            return _this.add({
              name: entry.name,
              href: entry.href
            });
          });
          _this.trigger("loaded");
          return callback();
        });
      }
    });
  });

}).call(this);
