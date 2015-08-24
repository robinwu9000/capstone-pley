//Global Collection: Pley.businesses
//jshint expr: true, boss: true
Pley.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "redirect",
    "businesses" : "businessSearch",
    "businesses/new" : "businessNew",
    "businesses/:id" : "businessShow"
  },

  initialize: function() {
    this.$el = $("#site-content");
  },

  redirect: function() {
    if(Backbone.history.getPath() === "users/new" ||
       Backbone.history.getPath() === "session/new") {
         //do nothing
    } else {
      Backbone.history.navigate("businesses", {trigger: true});
    }
  },

  businessNew: function() {
    var view = new Pley.Views.NewBusiness();
    this.swapViews(view);
  },

  businessSearch: function() {
    var params = this.parseQueryString(Backbone.history.getSearch().slice(1));
    if($.isEmptyObject(params)) {
      Pley.businesses.fetch();
    } else {
      Pley.businesses.fetch({
        data: {query: params.query, location: params.location}
      });
    }
    var view = new Pley.Views.RootPage({collection: Pley.businesses});
    this.swapViews(view);
  },

  businessShow: function(id) {
    var business = Pley.businesses.getOrFetch(id);
    var view = new Pley.Views.BusinessShow({model: business});
    this.swapViews(view);
  },

  swapViews: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $(document).scrollTop(0);
    this.$el.html(view.render().$el);
  },


  parseQueryString: function (queryString) {
    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

    var urlParams = {};
    while (match = search.exec(queryString))
       urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
  }
});
