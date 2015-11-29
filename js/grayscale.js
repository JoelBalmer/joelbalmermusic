/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");

        //TO FIX STYLING ISSUE FOR NAV BAR
        if ($(window).width() > 768) {
            $('#page-top > nav > div > div.navbar-collapse.navbar-right.navbar-main-collapse.collapse > ul > li:nth-child(2)').removeClass("active");
        }
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(document).ready(function(){
    window.console.log('hello');

    //TO FIX STYLING ISSUE FOR NAV BAR
    if ($(window).width() > 768) {
        var aboutListItem = $('#page-top > nav > div > div.collapse.navbar-collapse.navbar-right.navbar-main-collapse > ul > li:nth-child(2)');
        window.interval = setInterval(function() {
            if (aboutListItem.hasClass('active')) {
                aboutListItem.removeClass('active');
                clearInterval(interval);
            }
        }, 50);
    }

    //INITIAL CAROUSEL SETUP
    $('#achievementsCarousel').carousel({
        interval: 4500,
        pause: "hover"
    });

});


//YOUTUBE APIS

//this is a boilerplate set of calls to append a new script to your head tag
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "//www.youtube.com/iframe_api";
head.appendChild(script);
/**
* iFrame API (for iframe videos)
* onYouTubeIframeAPIReady is called for each player when it is ready
*/

window.onYouTubeIframeAPIReady = function(){
    console.log('youtube iframe ready');
    $('.main_video').each(function() {
        var iframe = optimizely.$(this);
        console.log('player is: ' + iframe[0]);

        // get the player(s)
        var player = new YT.Player(iframe[0], {
            events: {
                'onReady': function(e){
                    console.log('YouTube player \'' +iframe.attr('id') +'\': ready');
                    e.target._donecheck=true;
                },
                'onStateChange': function(e){
                    onStateChange(iframe.attr('id'), e);
                }
            }
        });
    });
};

//execute the API calls for play, pause, and finish
window.onStateChange = function(playerid, state) {
    if(state.data === 0) { 
        onFinish(playerid);
    } else if(state.data === 1) { 
        onPlay(playerid);
    } else if(state.data === 2) { 
        onPause(playerid);
    }
};

//for each of the above three states, make a custom event API call to Optimizely
window.onPause = function(id) {
    console.log('YouTube player \'' +id +'\': pause');
    $('#achievementsCarousel').carousel('cycle');
};
 
window.onFinish = function(id) {
    console.log('YouTube player \'' +id +'\': finish');
};
 
window.onPlay = function(id) {
    console.log('YouTube player \'' +id +'\': play');
    $('#achievementsCarousel').carousel('pause');
};

//YOUTUBE APIS END


//VIMEO API
$(function() {
    var iframe = $('#hanginVideo')[0];
    var player = $f(iframe);
    var status = $('.status');

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        status.text('ready');
        
        player.addEvent('pause', onPause);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);
    });

    // Call the API when a button is pressed
    $('button').bind('click', function() {
        player.api($(this).text().toLowerCase());
    });

    function onPause(id) {
        status.text('paused');
        console.log('paused' + status.text);
    }

    function onFinish(id) {
        status.text('finished');
        console.log('finished' + status.text);
    }

    function onPlayProgress(data, id) {
        status.text(data.seconds + 's played');
    }
});
//VIMEO API END


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
