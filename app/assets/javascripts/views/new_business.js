//jshint sub:true
Pley.Views.NewBusiness = Backbone.View.extend({
  template: JST["new_business"],

  events: {
    "submit form" : "createBusiness"
  },

  createBusiness: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    Pley.businesses.create(formData.business, {
      success: function (model) {
        Backbone.history.navigate("businesses/" + model.id, {trigger:true});
      },
      error: function(object, response) {
          $("#errors").html(response.responseText).fadeIn();
      }
    });
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
