//jshint sub: true
Pley.Views.BusinessShowDetails = Backbone.View.extend({
  template: JST["business_show_details"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({business: this.model}));
    return this;
  }
});
