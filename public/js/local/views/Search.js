(function() {

  define(["Backbone", "underscore", "text!./search.html", "eventbus"], function(Backbone, _, viewTemplate, bus) {
    var timeout;
    timeout = void 0;
    return Backbone.View.extend({
      initialize: function() {
        this.lastQuery = void 0;
        return this.entries = this.options.entries;
      },
      render: function() {
        this.$el.html(viewTemplate);
        return this;
      },
      search: function(evt) {
        var query,
          _this = this;
        console.log("searching...");
        if (this.$(evt.target).val().length < 3 || this.lastQuery === this.$(evt.target).val()) {
          return;
        }
        query = this.$(evt.target).serialize();
        this.$('.loading').show();
        this.lastQuery = this.$(evt.target).val();
        bus.trigger("search:query", this.lastQuery);
        return this.entries.loadBy(query, function() {
          return _this.$('.loading').hide();
        });
      },
      keyup: function(evt) {
        var _this = this;
        if (timeout) clearTimeout(timeout);
        return timeout = setTimeout(function() {
          return _this.search(evt);
        }, 500);
      },
      events: {
        'keyup .spotify-lookup': 'keyup',
        'change .spotify-lookup': 'search'
      }
    });
  });

}).call(this);
