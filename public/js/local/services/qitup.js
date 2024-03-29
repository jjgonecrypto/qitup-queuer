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
      if (!(parts != null ? parts.length : void 0)) return "";
      return parts[0].substr(2 + key.length);
    };
    return exports = {
      queue: function() {
        return findPart("q", window.location.search);
      },
      href: function() {
        return "http://live.qitup.fm";
        return window.location.origin + window.location.pathname + window.location.search;
      },
      preserve: function() {
        var token;
        token = findPart("access_token", window.location.hash);
        if (token.length) {
          cache.facebook.access_token = token;
          return localStorage.setItem("facebook_access_token", token);
        } else {
          return cache.facebook.access_token = localStorage["facebook_access_token"];
        }
      },
      socialStatus: function() {
        var _ref;
        return {
          facebook: ((_ref = exports.get("facebook.access_token")) != null ? _ref.length : void 0) > 0,
          twitter: false
        };
      },
      get: function(item) {
        var rCache;
        rCache = function(container, chain) {
          var parts;
          parts = chain.split('.');
          if (parts.length === 1) return container[parts[0]];
          return rCache(container[parts[0]], parts.slice(1).join('.'));
        };
        return rCache(cache, item);
      },
      facebookLoginUri: function() {
        var appID;
        appID = "504698779547671";
        return "https://www.facebook.com/dialog/oauth?client_id=" + appID + "&redirect_uri=" + (encodeURIComponent(exports.href())) + "&response_type=token&scope=publish_stream";
      }
    };
  });

}).call(this);
