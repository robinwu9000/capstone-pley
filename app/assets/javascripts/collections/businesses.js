Pley.Collections.Businesses = Backbone.Collection.extend({
  url: "/api/businesses",
  model: Pley.Models.Business,

  getOrFetch: function(id) {
    var business = this.get(id);

    if(!business) {
      business = new Pley.Models.Business({id: id});
      this.add(business);
    }

      business.fetch();
      return business;
  }
});
