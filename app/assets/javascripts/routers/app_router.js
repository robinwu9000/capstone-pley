//Global Collection: Pley.businesses
Pley.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "businessSearch"
    // "(*stuff)" : "businessSearch"
  },

  rootPage: function() {
    Pley.businesses.fetch({reset: true});
  },

  businessSearch: function() {
    var params = this.parseQueryString(Backbone.history.getSearch().slice(1));
    console.log(params);
    Pley.businesses.fetch({
      reset: true,
      data: {query: params.query, location: params.location}
    });
  },

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
