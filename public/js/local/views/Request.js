(function() {

  define(["Backbone", "underscore", "text!./request.html", "collections/entries", "models/entry", "views/requests"], function(Backbone, _, viewTemplate, entries, entry) {
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
        var type;
        type = this.item.get("type");
        this.$el.html(new klazz({
          item: this.item
        }).render().el);
        return this;
      }
    });
  });

}).call(this);
