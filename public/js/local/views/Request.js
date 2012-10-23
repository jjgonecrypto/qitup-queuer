(function() {

  define(["Backbone", "underscore", "collections/entries", "models/entry", "views/requests/Track", "views/requests/Artist", "views/requests/Album"], function(Backbone, _, entries, entry, Track, Artist, Album) {
    return Backbone.View.extend({
      initialize: function() {
        var _this = this;
        this.item = entries.findBy(this.options.action);
        if (this.item) return;
        return entry.loadBy(this.options.action, function(item) {
          _this.item = item;
          return _this.render();
        });
      },
      render: function() {
        var klazz, type;
        if (!this.item) return this;
        type = this.item.get("type");
        klazz = type === "artist" ? Artist : type === "album" ? Album : Track;
        this.$el.html(new klazz({
          item: this.item
        }).render().el);
        return this;
      }
    });
  });

}).call(this);
