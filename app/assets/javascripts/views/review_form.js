//jshint sub:true
Pley.Views.ReviewForm = Backbone.View.extend({
  template: JST["review_form"],
  tagName: "form",
  className: "animated slideInRight",


  events: {
    "submit" : "createReview",
    "click .cancel-button" : "closeReview"
  },

  initialize: function() {
    this.$el.css({"background": "white"});
  },

  createReview: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var newReview = new Pley.Models.Review(formData.review);
    newReview.save({}, {
      success: function() {
        this.model.reviews().add(newReview);
        this.model.fetch();
      }.bind(this)
    });
    this.closeReview();
  },

  closeReview: function() {
    this.$el.toggleClass("slideInRight slideOutRight");
    $("body").css({"background" : ""});
  },

  render: function() {
    this.$el.html(this.template({business: this.model}));
    return this;
  }
});
