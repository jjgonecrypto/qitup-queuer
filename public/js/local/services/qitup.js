// Generated by CoffeeScript 1.3.3
(function() {

  define([], function() {
    var cache, exports, findPart;
    cache = {
      facebook: {
        access_token: void 0
      }
    };
    findPart = function(key, str) {
      var parts, regex;
      regex = new RegExp("(?:\\\&" + key + "\\\=|\\\?" + key + "\\\=|\\\#" + key + "\\\=)[^&|^$|^/]+");
      parts = str.match(regex);
      if (!(parts != null ? parts.length : void 0)) {
        return "";
      }
      return parts[0].substr(2 + key.length);
    };
    return exports = {
      queue: function() {
        return findPart("q", window.location.search);
      },
      href: function() {
        return window.location.origin + window.location.pathname + window.location.search;
      },
      preserve: function() {
        var token;
        token = findPart("access_token", window.location.hash);
        if (token.length) {
          return cache.facebook.access_token = token;
        }
      },
      get: function(item) {
        var rCache;
        rCache = function(container, chain) {
          var parts;
          parts = chain.split('.');
          if (parts.length === 1) {
            return container[parts[0]];
          }
          return rCache(container[parts[0]], parts.slice(1).join('.'));
        };
        return rCache(cache, item);
      }
    };
  });

}).call(this);
