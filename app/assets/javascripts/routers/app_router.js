//Global Collection: Pley.businesses
Pley.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "rootPage",
    "/" : "businessSearch"
  },

  rootPage: function() {
    Pley.businesses.fetch({reset: true});
  },

  businessSearch: function(queryString) {
    var params = this.parseQueryString(queryString);
    debugger;
    Pley.businesses.fetch({
      reset: true,
      data: {query: params.query, location: params.location}
    });
  },

  parseQueryString: function(queryString){
    var params = {};
    if(queryString){
        _.each(
            _.map(decodeURI(queryString).split(/&/g),function(el,i){
                var aux = el.split('='), o = {};
                if(aux.length >= 1){
                    var val;
                    if(aux.length == 2)
                        val = aux[1];
                    o[aux[0]] = val;
                }
                return o;
            }),
            function(o){
                _.extend(params,o);
            }
        );
    }
    return params;
  }
});
