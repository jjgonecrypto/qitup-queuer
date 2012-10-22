(function() {

  define(['Backbone', 'models/Album', 'services/spotify'], function(Backbone, Album, spotify) {
    return Backbone.Collection.extend({
      model: Album,
      initialize: function() {},
      load: function(query, callback) {
        var _this = this;
        return spotify.load(query, 'album', function(err, data) {
          var top5;
          if (err) return callback(err);
          _this.reset();
          top5 = _.first(data.albums, 5);
          _.each(top5, function(entry) {
            var _ref, _ref2, _ref3;
            return _this.add({
              name: entry.name,
              href: entry.href,
              artist: (_ref = (_ref2 = entry.artists) != null ? (_ref3 = _ref2[0]) != null ? _ref3.name : void 0 : void 0) != null ? _ref : ''
            });
          });
          _this.trigger("loaded");
          return callback();
        });
      }
    });
  });

}).call(this);
