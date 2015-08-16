//Global Collection: Pley.businesses
Pley.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "redirect",
    "businesses" : "businessSearch",
    "businesses/:id" : "businessShow"
    // "(*stuff)" : "businessSearch"
  },

  initialize: function() {
    this.$el = $("#site-content");
  },

  redirect: function() {
    // debugger;
    if(Backbone.history.getPath() === "users/new" ||
       Backbone.history.getPath() === "session/new") {
         //do nothing;
    } else {
      Backbone.history.navigate("businesses", {trigger: true});
    }
  },

  businessSearch: function() {
    var view;

    var params = this.parseQueryString(Backbone.history.getSearch().slice(1));
    if($.isEmptyObject(params)) {
      Pley.businesses.fetch();
    } else {
      Pley.businesses.fetch({
        data: {query: params.query, location: params.location}
      });
    }
    view = new Pley.Views.RootPage({collection: Pley.businesses});
    console.log(params); console.log(Pley.businesses); console.log(view);

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
    this.$el.html(view.render().$el);
  },


  parseQueryString: function (queryString) {
    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
      // query  = window.location.search.substring(1);

    var urlParams = {};
    while (match = search.exec(queryString))
       urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
  }
});


  // parseQueryString: function(queryString){
  //   var params = {};
  //   if(queryString){
  //       _.each(
  //           _.map(decodeURI(queryString).split(/&/g),function(el,i){
  //               var aux = el.split('='), o = {};
  //               if(aux.length >= 1){
  //                   var val;
  //                   if(aux.length == 2)
  //                       val = aux[1];
  //                   o[aux[0]] = val;
  //               }
  //               return o;
  //           }),
  //           function(o){
  //               _.extend(params,o);
  //           }
  //       );
  //   }
  //   return params;
  // }
