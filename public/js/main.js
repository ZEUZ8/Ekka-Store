/*-----------------------------------------------------------------------------------

    Theme Name: Smartshop - Multipurpose eCommerce Template + Admin
    Description: Multipurpose eCommerce Template + Admin
    Author: Chitrakoot Web
    Version: 1.1
        
    ---------------------------------- */

!(function (o) {
  "use strict";
  var t,
    a = o(window);
  function i() {
    var e, t;
    (e = o(".full-screen")),
      (t = a.height()),
      e.css("min-height", t),
      (e = o("header").height()),
      (t = o(".screen-height")),
      (e = a.height() - e),
      t.css("height", e);
  }
  o("#preloader").fadeOut("normall", function () {
    o(this).remove();
  }),
    a.on("scroll", function () {
      a.scrollTop() <= 50
        ? o("header").removeClass("scrollHeader").addClass("fixedHeader")
        : o("header").removeClass("fixedHeader").addClass("scrollHeader");
    }),
    0 !== o(".mp-menu").length &&
      new mlPushMenu(
        document.getElementById("mp-menu"),
        document.getElementById("trigger"),
        { type: "cover" }
      ),
    a.on("scroll", function () {
      500 < o(this).scrollTop()
        ? o(".scroll-to-top").fadeIn(400)
        : o(".scroll-to-top").fadeOut(400);
    }),
    o(".scroll-to-top").on("click", function (e) {
      e.preventDefault(), o("html, body").animate({ scrollTop: 0 }, 600);
    }),
    o(".parallax,.bg-img").each(function (e) {
      o(this).attr("data-background") &&
        o(this).css(
          "background-image",
          "url(" + o(this).data("background") + ")"
        );
    }),
    o(".story-video").magnificPopup({ delegate: ".video", type: "iframe" }),
    o(".popup-video").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !1,
    }),
    o(".source-modal").magnificPopup({
      type: "inline",
      mainClass: "mfp-fade",
      removalDelay: 160,
    }),
    o(".newsletter-popup").magnificPopup({
      type: "inline",
      mainClass: "mfp-fade",
      removalDelay: 160,
    }),
    o(".search-category").on("click", function () {
      o(".categories-search").slideToggle();
    }),
    a.on("resize", function (e) {
      clearTimeout(t),
        (t = setTimeout(function () {
          991 < a.width()
            ? o(".categories-search").show()
            : o(".categories-search").hide();
        }, 250));
    }),
    0 !== o(".copy-clipboard").length &&
      (new ClipboardJS(".copy-clipboard"),
      o(".copy-clipboard").on("click", function () {
        var e = o(this);
        e.text();
        e.text("Copied"),
          setTimeout(function () {
            e.text("Copy");
          }, 2e3);
      })),
    a.resize(function (e) {
      setTimeout(function () {
        i();
      }, 500),
        e.preventDefault();
    }),
    i(),
    o(document).ready(function () {
      var e,
        t = window.location.pathname.split("/"),
        a = window.location.pathname,
        a = 0 < t[t.length - 1].length ? t[t.length - 1] : t[t.length - 2];
      o(".element-listing li")
        .find('a[href="' + a + '"]')
        .closest("li")
        .addClass("active"),
        o("#testmonials-carousel").owlCarousel({
          loop: !0,
          responsiveClass: !0,
          autoplay: !0,
          smartSpeed: 1e3,
          nav: !1,
          dots: !0,
          center: !0,
          margin: 0,
          responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } },
        }),
        o(".product-grid-slide").owlCarousel({
          loop: !0,
          nav: !1,
          dots: !0,
          autoplay: !0,
          autoplayTimeout: 5e3,
          responsiveClass: !0,
          autoplayHoverPause: !1,
          smartSpeed: 1e3,
          margin: 25,
          navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ],
          responsive: {
            0: { items: 1 },
            576: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 },
          },
        }),
        o(".offer-slider").owlCarousel({
          loop: !0,
          dots: !1,
          nav: !1,
          margin: 0,
          autoplay: !0,
          autoplayTimeout: 5e3,
          responsiveClass: !0,
          autoplayHoverPause: !1,
          smartSpeed: 1e3,
          responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } },
        }),
        o(".blog-slider").owlCarousel({
          loop: !0,
          dots: !1,
          nav: !1,
          margin: 30,
          autoplay: !0,
          autoplayTimeout: 5e3,
          responsiveClass: !0,
          autoplayHoverPause: !1,
          smartSpeed: 1e3,
          responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } },
        }),
        o(".featured-product").owlCarousel({
          loop: !1,
          responsiveClass: !0,
          responsiveClass: !0,
          dots: !0,
          nav: !1,
          autoplay: !1,
          autoplayTimeout: 5e3,
          autoplayHoverPause: !1,
          smartSpeed: 1e3,
          margin: 20,
          responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 3, margin: 30 },
            1200: { items: 4, margin: 30 },
          },
        }),
        o(".by-trend-carousel").owlCarousel({
          loop: !0,
          responsiveClass: !0,
          responsiveClass: !0,
          dots: !1,
          nav: !0,
          navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ],
          autoplay: !1,
          autoplayTimeout: 5e3,
          autoplayHoverPause: !1,
          smartSpeed: 1e3,
          margin: 20,
          responsive: {
            0: { items: 1, nav: !1, margin: 0, autoplay: !0 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 3, margin: 30 },
            1200: { items: 3, margin: 30 },
          },
        }),
        o(".clients").owlCarousel({
          loop: !0,
          nav: !1,
          dots: !1,
          autoplay: !0,
          smartSpeed: 500,
          autoplayTimeout: 3e3,
          responsiveClass: !0,
          autoplayHoverPause: !1,
          responsive: {
            0: { items: 2, margin: 20 },
            768: { items: 3, margin: 40 },
            992: { items: 4, margin: 60 },
            1200: { items: 5, margin: 80 },
          },
        }),
        o(".client-section .clients").owlCarousel({
          loop: !0,
          nav: !1,
          responsiveClass: !0,
          responsiveClass: !0,
          dots: !1,
          autoplay: !0,
          smartSpeed: 500,
          autoplayTimeout: 3e3,
          autoplayHoverPause: !1,
          responsive: {
            0: { items: 3, margin: 20 },
            768: { items: 4, margin: 40 },
            992: { items: 5, margin: 60 },
          },
        }),
        o(".slider-fade2").owlCarousel({
          items: 1,
          loop: !0,
          dots: !0,
          margin: 0,
          nav: !1,
          navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ],
          autoplay: !0,
          smartSpeed: 500,
          mouseDrag: !1,
          animateIn: "fadeIn",
          animateOut: "fadeOut",
          responsive: { 0: { nav: !1, dots: !1 }, 768: { nav: !1 } },
        }),
        o(".slider-fade1").owlCarousel({
          items: 1,
          loop: !0,
          dots: !1,
          margin: 0,
          nav: !0,
          navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ],
          autoplay: !0,
          smartSpeed: 500,
          mouseDrag: !1,
          animateIn: "fadeIn",
          animateOut: "fadeOut",
          responsive: { 0: { nav: !1 }, 768: { nav: !0 } },
        }),
        o(".owl-carousel").owlCarousel({
          items: 1,
          loop: !0,
          dots: !1,
          margin: 0,
          autoplay: !0,
          smartSpeed: 500,
        }),
        0 !== o("#rev_slider_1").length &&
          (e = jQuery)(document).ready(function () {
            null == e("#rev_slider_1").revolution
              ? revslider_showDoubleJqueryError("#rev_slider_1")
              : e("#rev_slider_1")
                  .show()
                  .revolution({
                    sliderType: "standard",
                    sliderLayout: "fullwidth",
                    delay: 12e3,
                    responsiveLevels: [1240, 1024, 767, 480],
                    gridwidth: [1350, 1200, 750, 350],
                    gridheight: [700, 700, 600, 600],
                    hideThumbs: 10,
                    fullScreenAutoWidth: "on",
                    fullScreenOffsetContainer: "header",
                    navigation: {
                      onHoverStop: "off",
                      touch: {
                        touchenabled: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: !1,
                      },
                      arrows: {
                        enable: !0,
                        style: "metis",
                        tmp: "",
                        rtl: !1,
                        hide_onleave: !0,
                        hide_onmobile: !0,
                        hide_under: 0,
                        hide_over: 9999,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        left: {
                          container: "slider",
                          h_align: "left",
                          v_align: "center",
                          h_offset: 20,
                          v_offset: 0,
                        },
                        right: {
                          container: "slider",
                          h_align: "right",
                          v_align: "center",
                          h_offset: 20,
                          v_offset: 0,
                        },
                      },
                      bullets: { enable: !1 },
                    },
                    spinner: "spinner4",
                  });
          }),
        0 !== o("#rev_slider_2").length &&
          (e = jQuery)(document).ready(function () {
            null == e("#rev_slider_2").revolution
              ? revslider_showDoubleJqueryError("#rev_slider_2")
              : e("#rev_slider_2")
                  .show()
                  .revolution({
                    sliderType: "standard",
                    sliderLayout: "fullwidth",
                    delay: 12e3,
                    responsiveLevels: [1240, 1024, 767, 480],
                    gridwidth: [1350, 1200, 750, 350],
                    gridheight: [700, 700, 600, 600],
                    hideThumbs: 10,
                    fullScreenAutoWidth: "on",
                    fullScreenOffsetContainer: "header",
                    navigation: {
                      onHoverStop: "off",
                      touch: {
                        touchenabled: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: !1,
                      },
                      arrows: {
                        enable: !0,
                        style: "metis",
                        tmp: "",
                        rtl: !1,
                        hide_onleave: !0,
                        hide_onmobile: !0,
                        hide_under: 0,
                        hide_over: 9999,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        left: {
                          container: "slider",
                          h_align: "left",
                          v_align: "center",
                          h_offset: 20,
                          v_offset: 0,
                        },
                        right: {
                          container: "slider",
                          h_align: "right",
                          v_align: "center",
                          h_offset: 20,
                          v_offset: 0,
                        },
                      },
                      bullets: { enable: !1 },
                    },
                    spinner: "spinner4",
                  });
          }),
        0 !== o(".horizontaltab").length &&
          o(".horizontaltab").easyResponsiveTabs({
            type: "default",
            width: "auto",
            fit: !0,
            tabidentify: "hor_1",
            activate: function (e) {
              var t = o(this),
                a = o("#nested-tabInfo");
              o("span", a).text(t.text()), a.show();
            },
          }),
        0 !== o(".childverticaltab").length &&
          o(".childverticaltab").easyResponsiveTabs({
            type: "vertical",
            width: "auto",
            fit: !0,
            tabidentify: "ver_1",
            activetab_bg: "#fff",
            inactive_bg: "#F5F5F5",
            active_border_color: "#c1c1c1",
            active_content_border_color: "#c1c1c1",
          }),
        0 !== o(".verticaltab").length &&
          o(".verticaltab").easyResponsiveTabs({
            type: "vertical",
            width: "auto",
            fit: !0,
            closed: "accordion",
            tabidentify: "hor_1",
            activate: function (e) {
              var t = o(this),
                a = o("#nested-tabInfo2");
              o("span", a).text(t.text()), a.show();
            },
          }),
        o(".countup").counterUp({ delay: 25, time: 2e3 }),
        0 !== o(".countdown").length &&
          (e = jQuery)(document).ready(function () {
            null == e(".countdown").countdown
              ? revslider_showDoubleJqueryError(".countdown")
              : e(".countdown")
                  .show()
                  .countdown({ date: "01 Dec 2024 00:01:00", format: "on" });
          }),
        o(".current-year").text(new Date().getFullYear());
    }),
    a.on("load", function () {
      a.stellar(),
        0 !== o(".price-range").length &&
          o(".price-range").ionRangeSlider({
            type: "double",
            grid: !0,
            min: 0,
            max: 1e3,
            from: 200,
            to: 800,
            prefix: "$",
          }),
        o(".portfolio-gallery").lightGallery();
    });
})(jQuery);
