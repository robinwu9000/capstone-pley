//jshint sub:true
Pley.Views.BusinessShow = Backbone.CompositeView.extend({
  template: JST["business_show"],
  className: "testing",

  initialize: function() {
    this.reviews = this.model.reviews();
    this.photos = this.model.photos();
    this.$el.css({"margin-top" : "10%"});
    // this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    this.attachUploadWidget();
    // debugger;
    this.attachDetailsView();
    return this;
  },

  attachDetailsView: function() {
    var view = new Pley.Views.BusinessShowDetails({model: this.model});
    this.attachSubview("#details-view", view);
  },

  attachUploadWidget: function() {
    $("#cloudinary-widget").cloudinary_upload_widget(CLOUDINARY_OPTIONS,
      function(error, result) {
        var photo = new Pley.Models.Photo({business_id: this.model.id,
          path: result[0].url
        });
        photo.save({}, {
          success: function() {
            this.model.photos().add(photo);
          }.bind(this)
        });
    }.bind(this));
  }
});
