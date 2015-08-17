//jshint sub: true
Pley.Views.PhotoView = Backbone.View.extend({
  template: JST["photo_view"],
  tagName: "div",

  initialize: function() {
    this.$el.css({"padding-bottom" : "10px"});
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({photo: this.model}));
    return this;
  }
});
