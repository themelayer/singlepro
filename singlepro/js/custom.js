$(function($){

  "use strict";

    /*
    |----------------------------------------------------------------------------
    | STICKY NAVBAR
    |----------------------------------------------------------------------------
    */
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 20) {
            $('.navbar-default-2').addClass('fixed-header-2');
        }
        else {
            $('.navbar-default-2').removeClass('fixed-header-2');
        }
    });


    
    /* -------------------------------------------------------------
      Variables
    ------------------------------------------------------------- */
    var leftArrow = '<i class="fa fa-chevron-left"></i>';
    var rightArrow = '<i class="fa fa-chevron-right"></i>';

    /* -------------------------------------------------------------
      main Slider
    ------------------------------------------------------------- */
    if ($('.main-slider').length){
        $('.main-slider').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'flipInX',
            items:1,
            margin:35,
            loop: true,
            autoplay:true,
            autoplayTimeout:1500,
            stagePadding:30,
            smartSpeed:450,
        });
    }

    /* -------------------------------------------------------------
        Feature-item-slider
    ------------------------------------------------------------- */
    if ($('.client-slider').length){
        $('.client-slider').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            nav: false,
            dots: true,
            items: 2,
            responsive:{
                0:{
                    items:1
                },
                992:{
                    items:2
                }
            }
        });
    }

    /* -------------------------------------------------------------
      Testimonial Slider
    ------------------------------------------------------------- */
    if ($('.testimonial-slider').length){
        $('.testimonial-slider').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            nav: true,
            dots: false,
            items: 1,
            navText: [leftArrow, rightArrow],
        });
    }

    /* -------------------------------------------------------------
        Fact Counter
    ------------------------------------------------------------- */
    if ( $('.fact-count').length){
        $('.fact-count').counterUp({
            delay: 10,
            time: 1000
        });
    }

    /*==========================================================
      WOW
    ==========================================================*/
    var wow = new WOW(
    {
      mobile: false
    });
    wow.init();
    
    /* -------------------------------------------------------------
        MAGNIFIC JS
    ------------------------------------------------------------- */
    $('.play-video').magnificPopup({
      type: 'iframe'
    });
    
    $.extend(true, $.magnificPopup.defaults, {
      iframe: {
        patterns: {
          youtube: {
            index: 'youtube.com/', 
            id: 'v=', 
            src: 'http://www.youtube.com/embed/%id%?autoplay=1' 
          }
        }
      }
    });


    /* -------------------------------------------------------------
      Tab js
    ------------------------------------------------------------- */         
    $( function() {
      $( "#tabs" ).tabs();
    } );

    /*
    |----------------------------------------------------------------------------
    | Ajax Mailchimp
    |----------------------------------------------------------------------------
    */
    $(document).ready(function () {
        var $form = $('#mc-embedded-subscribe-form')
        if ($form.length > 0) {
            $('form input[type="submit"]').bind('click', function (event) {
                if (event) event.preventDefault()
                register($form)
            })
        }
    })

    function register($form) {
    $('#mc-embedded-subscribe').val('Sending...');
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
        success: function (data) {
            $('#mc-embedded-subscribe').val('subscribe')
            if (data.result === 'success') {
                // Yeahhhh Success
                console.log(data.msg)
                $('#mce-EMAIL').css('borderColor', '#ffffff')
                $('#subscribe-result').css('color', 'rgb(53, 114, 210)')
                $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
                $('#mce-EMAIL').val('')
            } else {
                // Something went wrong, do something to notify the user.
                console.log(data.msg)
                $('#mce-EMAIL').css('borderColor', '#ff8282')
                $('#subscribe-result').css('color', '#ff8282')
                $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
            }
        }
    })
};

    /*
    |----------------------------------------------------------------------------
    | Google Map
    |----------------------------------------------------------------------------
    */
    if($('#map-canvas').length > 0){
      function popup_singlepro_map(){
         var map;        
          var myCenter=new google.maps.LatLng(53, -1.33);
          var marker=new google.maps.Marker({
              position:myCenter
          });
          function initialize() {
              var mapProp = {
                center:myCenter,
                zoom: 14,
                draggable: false,
                scrollwheel: false,
                mapTypeId:google.maps.MapTypeId.ROADMAP
              };

              map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);

               //Map Marker
              var marker = new google.maps.Marker({
                  position:myCenter,
                  map: map,
                  icon: 'images/marker.png'
              });

              google.maps.event.addListener(marker, 'click', function() {
                
              infowindow.setContent(contentString);
              infowindow.open(map, marker);

              }); 
          };

          google.maps.event.addDomListener(window, 'load', initialize);

          google.maps.event.addDomListener(window, "resize", resizingMap());

          $('#popupmodal').on('show.bs.modal', function() {
             //Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)
             resizeMap();
          })

          function resizeMap() {
             if(typeof map =="undefined") return;
             setTimeout( function(){resizingMap();} , 400);
          }

          function resizingMap() {
             if(typeof map =="undefined") return;
             var center = map.getCenter();
             google.maps.event.trigger(map, "resize");
             map.setCenter(center); 
          } 
      }
      popup_singlepro_map();

    };

    
        

}(jQuery));