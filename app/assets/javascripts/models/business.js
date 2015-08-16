Pley.Models.Business = Backbone.Model.extend({
  urlRoot: "/api/businesses",

  photos: function() {
    if(!this._photos) {
      this._photos = new Pley.Collections.Photos();
    }

    return this._photos;
  },

  reviews: function() {
    if(!this._reviews) {
      this._reviews = new Pley.Collections.Reviews();
    }

    return this._reviews;
  },

  parse: function(response) {
    if(response.photos) {
      this.photos().set(response.photos);
      delete response.photos;
    }

    if(response.reviews) {
      this.reviews().set(response.reviews);
      delete response.reviews;
    }
    
    return response;
  }
});
