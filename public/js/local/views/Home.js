// Generated by CoffeeScript 1.3.3
(function() {

  define(["Backbone", "underscore", "eventbus", "text!./home.html", "collections/entries", "views/Search", "views/Results", "collections/Tracks", "collections/Artists", "collections/Albums", "services/qitup"], function(Backbone, _, bus, viewTemplate, entries, Search, Results, Tracks, Artists, Albums, qitup) {
    return Backbone.View.extend({
      initialize: function() {
        entries.set({
          tracks: new Tracks(),
          artists: new Artists(),
          albums: new Albums()
        });
        return qitup.preserve();
      },
      render: function() {
        var url;
        url = "http://live.qitup.fm?q=qituptest" || qitup.href();
        this.$el.html(_.template(viewTemplate, {
          url: url,
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
