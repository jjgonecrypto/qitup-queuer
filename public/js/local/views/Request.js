// Generated by CoffeeScript 1.3.3
(function() {

  define(["Backbone", "underscore", "collections/entries", "models/entry", "services/qitup", "text!lib/twitter-button.html", "text!lib/facebook-button.html"], function(Backbone, _, entries, entry, qitup, twitter, facebook) {
    var i, requests;
    i = 0;
    requests = function(type, item) {
      var actions, template;
      template = function(req) {
        return _.template(type, {
          url: qitup.href(),
          i: i++,
          queue: qitup.queue(),
          request: req
        });
      };
      actions = function(prefix) {
        var _ref, _ref1;
        if (prefix == null) {
          prefix = "";
        }
        return {
          artist: {
            random: template(prefix + 'Play anything by "' + ((_ref = item.artist) != null ? _ref : item.name) + '"'),
            top: template(prefix + 'Play artist "' + ((_ref1 = item.artist) != null ? _ref1 : item.name) + '"')
          },
          track: template(prefix + 'Play "' + item.name + '" by "' + item.artist + '"'),
          album: {
            random: template(prefix + 'Play anything from "' + item.name + '" by "' + item.artist + '"'),
            top: template(prefix + 'Play from "' + item.name + '" by "' + item.artist + '"')
          }
        };
      };
      if (type === twitter) {
        return actions("@qitupfm ");
      } else {
        return actions();
      }
    };
    return Backbone.View.extend({
      initialize: function() {
        var _this = this;
        this.item = entries.findBy(this.options.action);
        if (this.item) {
          return;
        }
        return entry.loadBy(this.options.action, function(item) {
          _this.item = item;
          return _this.render();
        });
      },
      render: function() {
        var type,
          _this = this;
        if (!this.item) {
          return this;
        }
        type = this.item.get("type");
        require(["text!views/requests/" + type + ".html"], function(template) {
          var html;
          html = _.template(template, {
            twitter: requests(twitter, _this.item.toJSON()),
            facebook: requests(facebook, _this.item.toJSON()),
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
