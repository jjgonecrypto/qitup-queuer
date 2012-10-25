(function() {

  define(["Backbone", "underscore", "collections/entries", "models/entry", "services/qitup", "text!lib/twitter-script.html"], function(Backbone, _, entries, entry, qitup, twitterScript) {
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
        var type,
          _this = this;
        if (!this.item) return this;
        type = this.item.get("type");
        require(["text!views/requests/" + type + ".html"], function(template) {
          _this.$el.html(_.template(template, {
            item: _this.item.toJSON(),
            queue: qitup.queue(),
            url: qitup.href()
          }));
          return _this.$el.append(twitterScript);
        });
        return this;
      }
    });
  });

}).call(this);
