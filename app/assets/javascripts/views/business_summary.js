//jshint sub:true
Pley.Views.BusinessSummary = Backbone.View.extend({
  template: JST["business_summary"],
  className: "summary-item",
  tagName: "div",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.css({"height" : "190px"});
  },

  events: {
    "click" : "showBusiness"
  },

  render: function() {
    this.$el.html(this.template({business: this.model, photos: this.model.photos()}));
    return this;
  },

  showBusiness: function() {
    window.history.replaceState({}, "pley", "/");
    Backbone.history.navigate("businesses/" + this.model.id, {trigger: true});
  }

});
