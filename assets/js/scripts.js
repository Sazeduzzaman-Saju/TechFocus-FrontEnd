// RFQ Form Wizard
var current = 0;
var tabs = $(".tab");
var tabs_pill = $(".tab-pills");

loadFormData(current);

function loadFormData(n) {
  $(tabs_pill[n]).addClass("active");
  $(tabs[n]).removeClass("d-none");
  $("#back_button").attr("disabled", n == 0 ? true : false);

  if (n == tabs.length - 1) {
    $("#next_button").addClass("d-none"); // Hide the "Next" button on the last step
  } else {
    $("#next_button").removeClass("d-none"); // Show the "Next" button on other steps
  }
}

function next() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current++;
  loadFormData(current);
}

function back() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current--;
  loadFormData(current);
}

$(document).ready(function () {
  // Hide all the output divs initially
  $(".rfqoutput").hide();

  $("#rfqselector").change(function () {
    var selectedOption = $(this).val();
    $(".rfqoutput").hide();
    $("#" + selectedOption).show();
  });
});

// Fancy Product Image
// Mousewheel changes amount of zoom

$(document).ready(function () {
  // You can try out different effects here
  $(".xzoom, .xzoom-gallery").xzoom({
    zoomWidth: 400,
    title: true,
    tint: "#333",
    Xoffset: 15,
  });
  $(".xzoom2, .xzoom-gallery2").xzoom({
    position: "#xzoom2-id",
    tint: "#ffa200",
  });
  $(".xzoom3, .xzoom-gallery3").xzoom({
    position: "lens",
    lensShape: "circle",
    sourceClass: "xzoom-hidden",
  });
  $(".xzoom4, .xzoom-gallery4").xzoom({ tint: "#006699", Xoffset: 15 });
  $(".xzoom5, .xzoom-gallery5").xzoom({ tint: "#006699", Xoffset: 15 });

  //Integration with hammer.js
  var isTouchSupported = "ontouchstart" in window;

  if (isTouchSupported) {
    //If touch device
    $(".xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5").each(function () {
      var xzoom = $(this).data("xzoom");
      xzoom.eventunbind();
    });

    $(".xzoom, .xzoom2, .xzoom3").each(function () {
      var xzoom = $(this).data("xzoom");
      $(this)
        .hammer()
        .on("tap", function (event) {
          event.pageX = event.gesture.center.pageX;
          event.pageY = event.gesture.center.pageY;
          var s = 1,
            ls;

          xzoom.eventmove = function (element) {
            element.hammer().on("drag", function (event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              xzoom.movezoom(event);
              event.gesture.preventDefault();
            });
          };

          xzoom.eventleave = function (element) {
            element.hammer().on("tap", function (event) {
              xzoom.closezoom();
            });
          };
          xzoom.openzoom(event);
        });
    });

    $(".xzoom4").each(function () {
      var xzoom = $(this).data("xzoom");
      $(this)
        .hammer()
        .on("tap", function (event) {
          event.pageX = event.gesture.center.pageX;
          event.pageY = event.gesture.center.pageY;
          var s = 1,
            ls;

          xzoom.eventmove = function (element) {
            element.hammer().on("drag", function (event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              xzoom.movezoom(event);
              event.gesture.preventDefault();
            });
          };

          var counter = 0;
          xzoom.eventclick = function (element) {
            element.hammer().on("tap", function () {
              counter++;
              if (counter == 1) setTimeout(openfancy, 300);
              event.gesture.preventDefault();
            });
          };

          function openfancy() {
            if (counter == 2) {
              xzoom.closezoom();
              $.fancybox.open(xzoom.gallery().cgallery);
            } else {
              xzoom.closezoom();
            }
            counter = 0;
          }
          xzoom.openzoom(event);
        });
    });

    $(".xzoom5").each(function () {
      var xzoom = $(this).data("xzoom");
      $(this)
        .hammer()
        .on("tap", function (event) {
          event.pageX = event.gesture.center.pageX;
          event.pageY = event.gesture.center.pageY;
          var s = 1,
            ls;

          xzoom.eventmove = function (element) {
            element.hammer().on("drag", function (event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              xzoom.movezoom(event);
              event.gesture.preventDefault();
            });
          };

          var counter = 0;
          xzoom.eventclick = function (element) {
            element.hammer().on("tap", function () {
              counter++;
              if (counter == 1) setTimeout(openmagnific, 200);
              event.gesture.preventDefault();
            });
          };

          function openmagnific() {
            if (counter == 2) {
              xzoom.closezoom();
              var gallery = xzoom.gallery().cgallery;
              var i,
                images = new Array();
              for (i in gallery) {
                images[i] = { src: gallery[i] };
              }
              $.magnificPopup.open({
                items: images,
                type: "image",
                gallery: { enabled: true },
              });
            } else {
              xzoom.closezoom();
            }
            counter = 0;
          }
          xzoom.openzoom(event);
        });
    });
  } else {
    //If not touch device

    //Integration with fancybox plugin
    $("#xzoom-fancy").bind("click", function (event) {
      var xzoom = $(this).data("xzoom");
      xzoom.closezoom();
      $.fancybox.open(xzoom.gallery().cgallery, {
        padding: 0,
        helpers: { overlay: { locked: false } },
      });
      event.preventDefault();
    });

    //Integration with magnific popup plugin
    $("#xzoom-magnific").bind("click", function (event) {
      var xzoom = $(this).data("xzoom");
      xzoom.closezoom();
      var gallery = xzoom.gallery().cgallery;
      var i,
        images = new Array();
      for (i in gallery) {
        images[i] = { src: gallery[i] };
      }
      $.magnificPopup.open({
        items: images,
        type: "image",
        gallery: { enabled: true },
      });
      event.preventDefault();
    });
  }

  // Fancybox
  $('[data-fancybox="gallery"]').fancybox({
    // Options will go here
  });
});

// Fancy Box End

// Project Counter For Our Service Page

$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});




// 
function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function scroll_cb() {
  var scroll = $(window).scrollTop();
  var addClassOnScroll = function () {
    var windowTop = $(window).scrollTop();
    $("section[id]").each(function (index, elem) {
      var offsetTop = $(elem).offset().top;
      var outerHeight = $(this).outerHeight(true);

      if (windowTop > offsetTop - 50 && windowTop < offsetTop + outerHeight) {
        var elemId = $(elem).attr("id");
        $(".progress ul li a.current").removeClass("current");
        $(".progress ul li a[href='#" + elemId + "']").addClass("current");
      }
    });
  };
  addClassOnScroll();
}

$(document).ready(function () {
   window.addEventListener("scroll", throttle(scroll_cb, 100));
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var doc = $(document).height();
    var win = $(window).height();
    var value =
      (scroll / (doc - win)) *
      90; /* this value will varie in function of your page height*/
    $("ul .sideline").css("height", value + "%");
  });
  $("a.clickable").click(function () {
    $("a.current").removeClass("current");
    $(this).addClass("current");
  });
});


// Initialize Draggable Table
$('.dragable-table').dragableColumns();


