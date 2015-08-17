//jshint sub:true
Pley.Views.BusinessShow = Backbone.CompositeView.extend({
  template: JST["business_show"],
  className: "business-show",

  events: {
    "click #cloudinary-widget" : "attachUploadWidget",
    "click #add-review" : "showReviewForm"
  },

  initialize: function() {
    this.$el.css({"margin-top" : "10%"});

    this.reviews = this.model.reviews();
    this.photos = this.model.photos();

    this.reviews.each(this.addReviewView.bind(this));
    this.listenTo(this.reviews, "add", this.addReviewView.bind(this));   

    this.photos.each(this.addPhotoView.bind(this));
    this.listenTo(this.photos, "add", this.addPhotoView.bind(this));
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    this.attachDetailsView();
    return this;
  },

  showReviewForm: function() {
    var formView = new Pley.Views.ReviewForm({model: this.model});
    // formView.addClass("animated slideInRight");
    $(".review-form").html(formView.render().$el);
    $("body").css({"background" : "rgba(0,0,0,0.6)"});
  },

  addReviewView: function(review) {
    var subview = new Pley.Views.ReviewDetail({model: review});
    this.addSubview(".reviews-list", subview);
  },

  addPhotoView: function(photo) {
    var subview = new Pley.Views.PhotoView({model: photo});
    this.addSubview(".photos-list", subview);
  },

  attachDetailsView: function() {
    var view = new Pley.Views.BusinessShowDetails({model: this.model});
    this.attachSubview("#details-view", view);
  },

  attachUploadWidget: function(event) {
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS,
      function(error, result) {
        if(!error) {
          var photo = new Pley.Models.Photo({business_id: this.model.id,
            path: result[0].url
          });
          photo.save({}, {
            success: function() {
              this.photos.add(photo);
            }.bind(this)
          });
        }
    }.bind(this));
  }
});
