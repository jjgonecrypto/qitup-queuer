(function() {

  define(["jquery", "Backbone", "underscore", "collections/entries", "models/entry", "services/qitup", "text!lib/twitter-button.html", "text!lib/facebook-button.html"], function($, Backbone, _, entries, entry, qitup, twitter, facebook) {
    var ajax, i, requests;
    i = 0;
    ajax = void 0;
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
        var _ref, _ref2;
        if (prefix == null) prefix = "";
        return {
          artist: {
            random: template(prefix + 'Play anything by "' + ((_ref = item.artist) != null ? _ref : item.name) + '"'),
            top: template(prefix + 'Play artist "' + ((_ref2 = item.artist) != null ? _ref2 : item.name) + '"')
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
            twitter: requests(twitter, _this.item.toJSON()),
            facebook: requests(facebook, _this.item.toJSON()),
            item: _this.item.toJSON(),
            queue: qitup.queue(),
            url: qitup.href()
          });
          return _this.$el.html(html);
        });
        return this;
      },
      onFacebookPost: function(evt) {
        var _this = this;
        evt.preventDefault();
        if (!qitup.get("facebook.access_token")) {
          return window.location.href = qitup.facebookLoginUri();
        }
        if (ajax) return;
        $(evt.target).attr("disabled", "disabled");
        return ajax = $.ajax({
          url: "https://graph.facebook.com/qitup/feed?method=POST&message=" + (this.$(evt.target).data("message")) + "&access_token=" + (qitup.get("facebook.access_token")),
          dataType: "jsonp"
        }).done(function(data) {
          var _ref, _ref2;
          if (((_ref = data.error) != null ? _ref.code : void 0) === 190 && ((_ref2 = data.error) != null ? _ref2.error_subcode : void 0) === 463) {
            return window.location.href = qitup.facebookLoginUri();
          } else {
            _this.undelegateEvents();
            return _this.$el.html("Requested successfully.");
          }
        }).fail(function(err) {
          return window.location.href = qitup.facebookLoginUri();
        }).always(function() {
          $(evt.target).removeAttr("disabled");
          return ajax = void 0;
        });
      },
      events: {
        'click .post-to-facebook': 'onFacebookPost'
      }
    });
  });

}).call(this);
