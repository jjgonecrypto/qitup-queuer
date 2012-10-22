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
        var url;
        clear(query);
        url = "http://ws.spotify.com/search/1/" + type + ".json?" + query;
        this.lastQuery = query;
        return run.call(this, url, callback);
      },
      lookout: function(href, callback) {
        var url;
        clear();
        url = "http://ws.spotify.com/lookup/1/.json?uri=" + href;
        return run.call(this, url, callback);
      }
    };
  });

}).call(this);
