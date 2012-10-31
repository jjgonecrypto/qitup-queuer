(function() {

  define(["Backbone", "underscore", "services/spotify", "models/Album", "models/Track", "models/Artist"], function(Backbone, _, spotify, Album, Track, Artist) {
    var dispatcher, parse;
    parse = function(data) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      return {
        name: data.name,
        href: data.href,
        artist: (_ref = (_ref2 = (_ref3 = data.artists) != null ? (_ref4 = _ref3[0]) != null ? _ref4.name : void 0 : void 0) != null ? _ref2 : data.artist) != null ? _ref : data.name,
        album: (_ref5 = (_ref6 = data.album) != null ? _ref6.name : void 0) != null ? _ref5 : '',
        length: (_ref7 = data.length) != null ? _ref7 : 0
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
