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
    this.page_num = 1;

    this.reviews = new Pley.Collections.Reviews();
    this.reviews.fetch({remove: false, data: {biz_id: this.model.id, page: this.page_num}});

    this.photos = new Pley.Collections.Photos();
    this.photos.fetch({remove: false, data: {biz_id: this.model.id, page: this.page_num - 1}});

    this.reviews.each(this.addReviewView.bind(this));
    this.listenTo(this.reviews, "add", this.addReviewView.bind(this));

    this.photos.each(this.addPhotoView.bind(this));
    this.listenTo(this.photos, "add", this.addPhotoView.bind(this));

    this.listenTo(this.model, "sync", this.addMap);
  },

  nextPage: function(event) {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      window.setTimeout(function() {
        this.page_num++;
        this.reviews.fetch({remove: false, data: {biz_id: this.model.id, page: this.page_num}});
        this.photos.fetch({remove: false, data: {biz_id: this.model.id, page: this.page_num - 1}});
      }.bind(this), 200);
   }
  },

  listenForScroll: function () {
   $(window).off("scroll"); // remove previous listeners
   var throttledCallback = _.throttle(this.nextPage.bind(this), 450);
   $(window).on("scroll", throttledCallback);
 },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    this.attachDetailsView();
    this.listenForScroll();
    return this;
  },

  addMap: function() {
    var attr = this.model.attributes;
    var address = attr.address + " " + attr.state + " " + attr.zip_code;
    var geocoder = new google.maps.Geocoder();
    var options = {zoom: 15};
    geocoder.geocode({"address" : address}, function(results, status) {
      options.center = results[0].geometry.location;
      var newmap = new google.maps.Map($("#map")[0], options);
      var marker = new google.maps.Marker({
        map: newmap,
        position: options.center
      });
    });
  },

  showReviewForm: function() {
    var formView = new Pley.Views.ReviewForm({model: this.model, collection: this.reviews});
    // formView.addClass("animated slideInRight");
    $(".review-location").html(formView.render().$el);
    $("body").prepend("<div id='modal-background'></div>");
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
    $("#cloudinary-widget").attr("disabled", "disabled");
    setTimeout(function() {
      $("#cloudinary-widget").removeAttr("disabled");
    },1000);
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
