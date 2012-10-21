(function() {

  define(['models/track', 'services/spotify'], function(Track, spotify) {
    return Backbone.Collection.extend({
      model: Track,
      url: '/api/v1/track',
      initialize: function() {},
      load: function(query, callback) {
        var _this = this;
        return spotify.load(query, 'track', function(err, data) {
          var top5;
          if (err) return callback(err);
          _this.reset();
          top5 = _.first(data.tracks, 5);
          _.each(top5, function(entry) {
            var _ref, _ref2, _ref3, _ref4, _ref5;
            return _this.add({
              name: entry.name,
              href: entry.href,
              artist: (_ref = (_ref2 = entry.artists) != null ? (_ref3 = _ref2[0]) != null ? _ref3.name : void 0 : void 0) != null ? _ref : '',
              album: (_ref4 = (_ref5 = entry.album) != null ? _ref5.name : void 0) != null ? _ref4 : '',
              length: entry.length
            });
          });
          _this.trigger("loaded");
          return callback();
        });
      }
    });
  });

}).call(this);
