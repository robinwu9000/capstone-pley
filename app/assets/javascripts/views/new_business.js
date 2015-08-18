//jshint sub:true
Pley.Views.NewBusiness = Backbone.View.extend({
  template: JST["new_business"],
  tagName: "form",
  className: "new-business",

  events: {
    "submit" : "createBusiness"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
