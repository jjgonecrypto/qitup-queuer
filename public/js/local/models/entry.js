(function() {

  define(["Backbone", "underscore", "services/spotify", "models/Album", "models/Track", "models/Artist"], function(Backbone, _, spotify, Album, Track, Artist) {
    var dispatcher, parse;
    parse = function(data) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
      return {
        name: data.name,
        href: data.href,
        artist: (_ref = (_ref2 = data.artists) != null ? (_ref3 = _ref2[0]) != null ? _ref3.name : void 0 : void 0) != null ? _ref : '',
        album: (_ref4 = (_ref5 = data.album) != null ? _ref5.name : void 0) != null ? _ref4 : '',
        length: (_ref6 = data.length) != null ? _ref6 : 0
      };
    };
    dispatcher = {
      loadBy: function(href, done) {
        return spotify.lookup(href, function(err, data) {
          var item, klazz, type;
          type = href.split(':')[1];
          klazz = type === "artist" ? Artist : type === "album" ? Album : Track;
          item = new klazz(parse(data.track || data.artist || data.album));
          return done(item);
        });
      }
    };
    return _.extend(dispatcher, Backbone.Events);
  });

}).call(this);
