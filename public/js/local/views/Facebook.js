(function() {

  define(["Backbone", "underscore", "eventbus", "text!./facebook.html", "services/qitup"], function(Backbone, _, bus, viewTemplate, qitup) {
    return Backbone.View.extend({
      initialize: function() {
        return qitup.preserve();
      },
      render: function() {
        this.$el.html(_.template(viewTemplate, {
          facebookLoginUri: qitup.facebookLoginUri(),
          status: qitup.socialStatus()
        }));
        return this;
      }
    });
  });

}).call(this);
