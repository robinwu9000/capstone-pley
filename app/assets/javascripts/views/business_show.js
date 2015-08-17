//jshint sub:true
Pley.Views.BusinessShow = Backbone.CompositeView.extend({
  template: JST["business_show"],
  className: "testing",

  events: {
    "click #cloudinary-widget" : "attachUploadWidget"
  },

  initialize: function() {
    this.$el.css({"margin-top" : "10%"});

    this.reviews = this.model.reviews();
    this.photos = this.model.photos();
    this.reviews.each(this.addReviewView.bind(this));
    this.listenTo(this.reviews, "add", this.addReviewView.bind(this));
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    this.attachDetailsView();
    return this;
  },

  addReviewView: function(review) {
    var subview = new Pley.Views.ReviewDetail({model: review});
    this.addSubview(".reviews-list", subview);
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
