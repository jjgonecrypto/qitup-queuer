(function() {

  define(["Backbone", "underscore", "text!./search.html", "eventbus"], function(Backbone, _, viewTemplate, bus) {
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
      events: {
        'keyup .spotify-lookup': 'search',
        'change .spotify-lookup': 'search'
      }
    });
  });

}).call(this);
