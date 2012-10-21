(function() {

  define(["Backbone", "underscore", "text!./home.html", "collections/entries", "views/Search", "collections/Tracks", "collections/Artists", "collections/Albums"], function(Backbone, _, viewTemplate, entries, Search, Tracks, Artists, Albums) {
    return Backbone.View.extend({
      initialize: function() {
        return entries.set({
          tracks: new Tracks(),
          artists: new Artists(),
          albums: new Albums()
        });
      },
      render: function() {
        this.$el.html(_.template(viewTemplate));
        this.$('.search').html(new Search({
          entries: entries
        }).render().el);
        return this;
      }
    });
  });

}).call(this);
