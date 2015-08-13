window.Pley = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Pley.businesses = new Pley.Collection.Businesses();
    new Pley.Routers.AppRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Pley.initialize();
});
