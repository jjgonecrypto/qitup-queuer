(function() {

  define([], function() {
    var exports;
    return exports = {
      queue: function() {
        var parts;
        parts = window.location.search.match(/(?:\&q\=|\?q\=)[^&|^$]+/);
        if (!(parts != null ? parts.length : void 0)) return "";
        return parts[0].substr(3);
      },
      href: function() {
        return window.location.origin + window.location.pathname + window.location.search;
      }
    };
  });

}).call(this);
