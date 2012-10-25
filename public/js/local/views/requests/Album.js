(function() {

  define(["Backbone", "underscore", "text!./album.html", "services/qitup", "text!lib/twitter-script.html"], function(Backbone, _, viewTemplate, qitup, twitterScript) {
    return Backbone.View.extend({
      initialize: function() {
        return this.album = this.options.item;
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          album: this.album.toJSON(),
          queue: qitup.queue(),
          url: qitup.href()
        }));
        this.$el.append(twitterScript);
        return this;
      }
    });
  });

}).call(this);
