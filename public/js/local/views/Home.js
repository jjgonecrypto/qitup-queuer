(function() {

  define(["Backbone", "underscore", "eventbus", "text!./home.html", "collections/entries", "views/Search", "views/Results", "collections/Tracks", "collections/Artists", "collections/Albums", "services/qitup"], function(Backbone, _, bus, viewTemplate, entries, Search, Results, Tracks, Artists, Albums, qitup) {
    return Backbone.View.extend({
      initialize: function() {
        return entries.set({
          tracks: new Tracks(),
          artists: new Artists(),
          albums: new Albums()
        });
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          url: qitup.href(),
          facebookAppID: "504698779547671"
        }));
        this.$('.search').html(new Search({
          entries: entries
        }).render().el);
        this.$('.results').html(new Results({
          entries: entries
        }).render().el);
        return this;
      }
    });
  });

}).call(this);
