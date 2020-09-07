///////////////////////////////
// Smart Resize
///////////////////////////////

(function($,sr) {
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      };
      if (timeout)
        clearTimeout(timeout); else if (execAsap)
        func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  }

  // smartresize
  jQuery.fn[sr] = function(fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };
})

(jQuery,'smartresize');

$(function() {
  ///////////////////////////////
  // Fix the Home Height
  ///////////////////////////////

  
  ///////////////////////////////
  // One page Smooth Scrolling
  ///////////////////////////////

  $('a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////

  function centerHomeBannerText() {
    var bannerText = jQuery('#wrapper #starting');
    var bannerTextTop = (jQuery('#wrapper').actual('height')/2) - (jQuery('#wrapper #starting').actual('height')/2) - 20;
    bannerText.css('padding-top', bannerTextTop+'px');
    bannerText.show();
  }

  centerHomeBannerText();

  jQuery(window).smartresize(function() {
    //setHomeBannerHeight();
    centerHomeBannerText();
  });
});

$(document).ready(function(){
  new WOW().init();
  $("#client-speech").owlCarousel
  ({
    autoPlay: 3000,
    navigation : false, // Show next and prev buttons
    slideSpeed : 700,
    paginationSpeed : 1000,
    singleItem:true
  });
});

$(document).ready(function(){
  var menu = $('#top-nav');
  var heading = $('#heading');
  var origOffsetY = heading.offset().top + heading.height() - (menu.height() / 2);

  function change_nav_class() {
    if ($(window).scrollTop() > origOffsetY) {
      menu.addClass('navbar-light');
      menu.removeClass('navbar-dark');
    } else {
      menu.addClass('navbar-dark');
      menu.removeClass('navbar-light');
    }
  }

  document.onscroll = change_nav_class;
});

$(document).ready(function(){
  $("#buttons").delay(5000).fadeIn();
  
  var bodyScrollHeight = $("body").prop('scrollHeight');
  function fixAndStickButton() {
    if(window.matchMedia("(min-width: 1200px)").matches){
      if(bodyScrollHeight < 1500) {
        if ($(document).scrollTop() > (bodyScrollHeight * 25) * 0.01){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if(bodyScrollHeight > 1499 && bodyScrollHeight < 2500) {
        if ($(document).scrollTop() > (bodyScrollHeight * 50) * 0.01){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if(bodyScrollHeight > 2499 && bodyScrollHeight < 3600) {
        if ($(document).scrollTop() > (bodyScrollHeight * 65) * 0.01){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if(bodyScrollHeight > 3599 && bodyScrollHeight < 7000) {
        if ($(document).scrollTop() > (bodyScrollHeight * 75) * 0.01){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if(bodyScrollHeight > 6999) {
        if ($(document).scrollTop() > (bodyScrollHeight * 88) * 0.01){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
    }

    if(window.matchMedia("(min-width: 700px) and (max-width: 1080px)").matches) {
      if($("body").innerHeight() < 1800) {
        if ($(document).scrollTop() > 10){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      if($("body").innerHeight() > 1799 && $("body").innerHeight() < 2600) {
        if ($(document).scrollTop() > 500){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if($("body").innerHeight() > 2599 && $("body").innerHeight() < 3600) {
        if ($(document).scrollTop() > 1500){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if($("body").innerHeight() > 3599 && $("body").innerHeight() < 5000) {
        if ($(document).scrollTop() > 2500){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if($("body").innerHeight() > 4999 && $("body").innerHeight() < 6500) {
        if ($(document).scrollTop() > 3500){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
      else if($("body").innerHeight() > 6499) {
        if ($(document).scrollTop() > 5000){
          $( "#buttons" ).removeClass( "fixed-button" ).addClass( "sticky-button" );
        } else {
          $( "#buttons" ).removeClass( "sticky-button" ).addClass( "fixed-button" );
        }
      }
    }

    if(window.matchMedia("(min-width: 220px) and (max-width: 580px)").matches) {
      if($("body").innerHeight() < 2000) {
        if ($(document).scrollTop() > 800){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 1999 && $("body").innerHeight() < 2600) {
        if ($(document).scrollTop() > 1000){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 2599 && $("body").innerHeight() < 3000) {
        if ($(document).scrollTop() > 1500){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 2999 && $("body").innerHeight() < 4000) {
        if ($(document).scrollTop() > 2000){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 3999 && $("body").innerHeight() < 5000) {
        if ($(document).scrollTop() > 3000){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 4999 && $("body").innerHeight() < 6500) {
        if ($(document).scrollTop() > 4000){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 6499 && $("body").innerHeight() < 9500) {
        if ($(document).scrollTop() > ($("body").innerHeight() * 80) * 0.01){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }
      else if($("body").innerHeight() > 9499) {
        if ($(document).scrollTop() > ($("body").innerHeight() * 90) * 0.01){
          $( "#buttons" ).hide();
        } else {
          $( "#buttons" ).show();
        }
      }         
    } 
  }  
  $(".fa-times").click(function(){
    $("#buttons").hide();
  });

  document.onscroll = fixAndStickButton;  
});
