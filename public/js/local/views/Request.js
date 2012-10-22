(function() {

  define(["Backbone", "underscore", "text!./request.html", "collections/entries", "models/entry"], function(Backbone, _, viewTemplate, entries, entry) {
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
        if (this.item) {
          this.$el.html(_.template(viewTemplate, {
            item: this.item.toJSON()
          }));
        }
        return this;
      }
    });
  });

}).call(this);
