//Global Collection: Pley.businesses
Pley.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "rootPage",
    "businesses/?" : "businessSearch"
  },

  rootPage: function() {
    Pley.businesses.fetch({reset: true});
  },

  businessSearch: function(params) {
    Pley.businesses.fetch({
      reset: true,
      data: {"query": params.query, "location": params.location}
    })
  }
});
