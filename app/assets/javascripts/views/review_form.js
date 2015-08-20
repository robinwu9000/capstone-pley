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
        this.model.fetch();
      }.bind(this)
    });
    this.closeReview();
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
