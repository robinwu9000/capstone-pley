//jshint sub:true
Pley.Views.BusinessShow = Backbone.CompositeView.extend({
  template: JST["business_show"],

  initialize: function() {
    this.reviews = this.model.reviews() || {};
    this.photos = this.model.photos() || {};
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    debugger;
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
