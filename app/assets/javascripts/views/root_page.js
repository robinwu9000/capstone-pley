//jshint sub: true
Pley.Views.RootPage = Backbone.CompositeView.extend({
  template: JST["root_page"],

  initialize: function() {
    this.listenTo(this.collection, "add", this.addBusinessSummaryView);
    this.collection.each(this.addBusinessSummaryView.bind(this));
    this.listenTo(this.collection, "remove", this.removeBusinessSummaryView);
    this.listenTo(this.collection, "sync", this.checkSearchResult);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    $(".footer").html("<a href='#businesses/new'><h2 style='text-align: center;'>Don't See What You're Looking For? Go Add It!</h2></a>");
    this.listenForScroll();
    this.attachSubviews();
    return this;
  },

  listenForScroll: function () {
   $(window).off("scroll"); // remove previous listeners
   var throttledCallback = _.throttle(this.scrollMap.bind(this), 0);
   $(window).on("scroll", throttledCallback);
 },

  scrollMap: function() {
    var parentTop = $(".business-list").offset().top;
    if($(window).scrollTop() + 50 > parentTop) {
      $("#map").css({"top" : $(window).scrollTop() - parentTop + 50});
    }
  },

  removeBusinessSummaryView: function(model) {
    this.removeModelSubview(".business-list", model);
  },

  addBusinessSummaryView: function(business) {
    var subview = new Pley.Views.BusinessSummary({model: business, id: "biz-" + business.id});
    this.addSubview(".business-list", subview);
  },

  checkSearchResult: function() {
    if (this.collection.length === 0) {
      this.$("#map").css({"display": "none"});
      this.$("#no-results").html("<h1 style='text-align: center; color: red;'>Sorry, your search did not return any results.</h1>");
    } else {
      var options = {
        zoom: 12,
        center: {lat: 37.77, lng: -122.43},
        scrollwheel: false
      };

      var newmap = new google.maps.Map($("#map")[0], options);

      var geocoder = new google.maps.Geocoder();
      this.collection.each(function(place) {
        var attr = place.attributes;
        var address = attr.address + " " + attr.state + " " + attr.zip_code;
        geocoder.geocode({"address" : address}, function(results, status) {
          var newCenter = results[0].geometry.location || options.center;
          newmap.setCenter(newCenter);
          var marker = new google.maps.Marker({
            map: newmap,
            position: results[0].geometry.location
          });

          google.maps.event.addDomListener(document.getElementById("biz-" + place.id),
            "hover",
            function() {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            });
        });
      });
    }
  }
});
