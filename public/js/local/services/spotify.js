(function() {

  define([], function() {
    return {
      load: function(query, type, callback) {
        var url,
          _this = this;
        console.log("query entered: " + query);
        if (this.lastRequest && this.lastQuery === query) this.lastRequest.abort();
        url = "http://ws.spotify.com/search/1/" + type + ".json?" + query;
        console.log("GET " + url);
        this.lastQuery = query;
        return this.lastRequest = $.ajax({
          url: url
        }).done(function(data) {
          return callback(null, data);
        }).fail(function(req, err) {
          return callback(err);
        }).always(function() {
          return _this.lastRequest = null;
        });
      }
    };
  });

}).call(this);
