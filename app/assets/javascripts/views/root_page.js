//jshint sub: true
Pley.Views.RootPage = Backbone.CompositeView.extend({
  template: JST["root_page"],

  initialize: function() {
    this.listenTo(this.collection, "add", this.addBusinessSummaryView);
    this.collection.each(this.addBusinessSummaryView.bind(this));
    this.listenTo(this.collection, "remove", this.removeBusinessSummaryView);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    $(".footer").html("<a href='#businesses/new'><h2 style='text-align: center;'>Don't See What You're Looking For? Go Add It!</h2></a>");
    this.attachSubviews();
    return this;
  },

  removeBusinessSummaryView: function(model) {
    this.removeModelSubview(".business-list", model);
  },

  addBusinessSummaryView: function(business) {
    var subview = new Pley.Views.BusinessSummary({model: business});
    this.addSubview(".business-list", subview);
  }
});
