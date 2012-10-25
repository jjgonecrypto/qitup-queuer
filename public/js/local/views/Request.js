(function() {

  define(["Backbone", "underscore", "collections/entries", "models/entry", "services/qitup", "text!lib/twitter-button.html"], function(Backbone, _, entries, entry, qitup, twitter) {
    var i, requests;
    i = 0;
    requests = function(item) {
      var templatize, _ref, _ref2;
      templatize = function(req) {
        return _.template(twitter, {
          url: qitup.href(),
          i: i++,
          queue: qitup.queue(),
          request: req
        });
      };
      return {
        artist: {
          random: templatize('Play anything by "' + ((_ref = item.artist) != null ? _ref : item.name) + '"'),
          top: templatize('Play artist "' + ((_ref2 = item.artist) != null ? _ref2 : item.name) + '"')
        },
        track: templatize('Play "' + item.name + '" by "' + item.artist + '"'),
        album: {
          random: templatize('Play anything from "' + item.name + '" by "' + item.artist + '"'),
          top: templatize('Play from "' + item.name + '" by "' + item.artist + '"')
        }
      };
    };
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
          var html;
          html = _.template(template, {
            requests: requests(_this.item.toJSON()),
            item: _this.item.toJSON(),
            queue: qitup.queue(),
            url: qitup.href()
          });
          return _this.$el.html(html);
        });
        return this;
      }
    });
  });

}).call(this);
