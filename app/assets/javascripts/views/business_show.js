//jshint sub:true
Pley.Views.BusinessShow = Backbone.CompositeView.extend({
  template: JST["business_show"],

  initialize: function() {
    this.reviews = this.model.reviews();
    this.photos = this.model.photos();
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    // debugger;
    this.$el.html(this.template({business: this.model}));
    this.attachSubviews();
    this.attachUploadWidget();
    return this;
  },

  attachUploadWidget: function() {
    $("#cloudinary_widget").cloudinary_upload_widget(CLOUDINARY_OPTIONS,
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
