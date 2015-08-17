//jshint sub:true
Pley.Views.ReviewDetail = Backbone.View.extend({
  template: JST["review_detail"],
  tagName: "div",
  className: "review-item",

  render: function() {
    this.$el.html(this.template({review: this.model}));
    return this;
  }
});
