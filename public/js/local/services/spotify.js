(function() {

  define([], function() {
    var clear, run;
    clear = function(query) {
      if (this.lastRequest && (!query || this.lastQuery === query)) {
        return this.lastRequest.abort();
      }
    };
    run = function(uri, callback) {
      var _this = this;
      console.log("GET " + uri);
      return this.lastRequest = $.ajax({
        url: uri
      }).done(function(data) {
        return callback(null, data);
      }).fail(function(req, err) {
        return callback(err);
      }).always(function() {
        return _this.lastRequest = null;
      });
    };
    return {
      load: function(query, type, callback) {
        var uri;
        clear(query);
        uri = "http://ws.spotify.com/search/1/" + type + ".json?" + query;
        this.lastQuery = query;
        return run.call(this, uri, callback);
      },
      lookup: function(href, callback) {
        var uri;
        clear();
        uri = "http://ws.spotify.com/lookup/1/.json?uri=" + href;
        return run.call(this, uri, callback);
      }
    };
  });

}).call(this);
