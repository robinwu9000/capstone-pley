//jshint sub:true
Pley.Views.ReviewForm = Backbone.View.extend({
  template: JST["review_form"],

  render: function() {
    this.$el.html(this.template({business: this.model}));
    return this;
  }
});
