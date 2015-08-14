//jshint sub: true
Pley.Views.RootPage = Backbone.CompositeView.extend({
  template: JST["root_page"],

  initialize: function() {
    // this.listenTo(this.collection, "add", this.addBusinessSummaryView);
    this.collection.each(this.addBusinessSummaryView.bind(this));
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBusinessSummaryView: function(business) {
    var subview = new BusinessSummaryView({model: business});
    this.addSubview(".business-list", subview);
  }
});
