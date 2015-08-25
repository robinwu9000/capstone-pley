//jshint sub:true
Pley.Views.ReviewForm = Backbone.View.extend({
  template: JST["review_form"],
  className: "animated slideInRight",
  id:"review-form",

  events: {
    "submit form" : "createReview",
    "click .cancel-button" : "closeReview"
  },

  createReview: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newReview = new Pley.Models.Review(formData.review);
    newReview.save({}, { wait: true,
      success: function(model) {
        this.collection.add(model);
        this.closeReview();
      }.bind(this),
      error: function(object, response) {
        $("#errors").html(response.responseText).fadeIn();
      }
    });
  },

  closeReview: function() {
    this.$el.toggleClass("slideInRight slideOutRight");
    $("#modal-background").remove();
  },

  render: function() {
    this.$el.html(this.template({business: this.model}));
    return this;
  }
});
