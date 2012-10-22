(function() {

  define(["Backbone", "underscore", "text!./request.html", "collections/entries"], function(Backbone, _, viewTemplate, entries) {
    return Backbone.View.extend({
      initialize: function() {
        return this.item = entries.findBy(this.options.action) || spotify.lookup(this.options.action);
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          item: this.item.toJSON()
        }));
        return this;
      }
    });
  });

}).call(this);
