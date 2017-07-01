/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var fadeOverlay;

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

    //TRYING GALLERY ANIMATION
    $('.thumbnail').hover(
        function(){
             $(this).find("img").fadeTo( "medium" , 0.4, function() {
                //animation complete;
            });
        },function(){
             $(this).find("img").fadeTo( "medium" , 1.0, function() {
                //animation complete;
            });
        }
    );

    //MAKE SURE NAV BAR IS SHOWN (OR NOT) ON REFRESH
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");


    } 
    else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }


    // $('.modal-content').on('shown', function() {
    //     console.log('button pressed2 !');
    // })

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
    

    $('#showreelModal').on('hidden.bs.modal', function () {
        //PAUSE SHOWREEL VIDEO
        $f($('#showreelVideo')[0]).api('pause');

        //DE-HIGHLIGHT SHOWREEL BUTTON PRESSED STYLING
        //$('#btn-showreel').removeClass('btn-sm-pressed');
        
        //IF CLOSE BUTTON IS NOT PRESSED
        $('#btn-showreel').removeClass('btn-sm-pressed');
    });


    //TRY AND CATCH BACKDROP CLICKS
    $('#showreelModal').click(function (e) {
        fadeOverlay = e.target.id;
        if (fadeOverlay === 'showreelModal') {
            console.log('showreel modal fade clicked!');
            $('#btn-showreel').removeClass('btn-sm-pressed')
        }
    });

    $('#soundcloudModal').click(function (e) {
        fadeOverlay = e.target.id;
        if (fadeOverlay === 'soundcloudModal') {
            console.log('soundcloud modal fade clicked!');
            $('#btn-soundcloud').removeClass('btn-sm-pressed')
        }
    });
});


//FUNCTION FOR SOUNDCLOUD PRESSED

function btn_sm_pressed_soundcloud() {
    $('#btn-soundcloud').toggleClass('btn-sm-pressed');
}

//MODAL CLOSE BUTTON
function closedButtonPressed() {
    $('#btn-soundcloud').removeClass('btn-sm-pressed');
}


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
    
    // ensures the optimizely object is defined globally using
    window['optimizely'] = window['optimizely'] || [];
    // sends a tracking call to Optimizely for the given event name. 
    window.optimizely.push(["trackEvent", "Youtube paused"]);
};
 
window.onFinish = function(id) {
    console.log('YouTube player \'' +id +'\': finish');
};
 
window.onPlay = function(id) {
    console.log('YouTube player \'' +id +'\': play');
    $('#achievementsCarousel').carousel('pause');
    // ensures the optimizely object is defined globally using
    window['optimizely'] = window['optimizely'] || [];
    // sends a tracking call to Optimizely for the given event name. 
    window.optimizely.push(["trackEvent", "Youtube played"]);
};

//YOUTUBE APIS END


//VIMEO API
$(function() {
    var iframe = $('#hanginVideo')[0];
    var player = $f(iframe);
    var playerShowreel = $f($('#showreelVideo')[0]);
    var status = $('.status');

    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        status.text('ready');
        
        player.addEvent('pause', onPause);
        player.addEvent('play', onPlay);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', onPlayProgress);

    });

    // Call the API when a button is pressed
    $('button').bind('click', function() {
        player.api($(this).text().toLowerCase());
    });

    function onPause(id) {
        status.text('paused');
        console.log('vimeo paused!');
        $('#achievementsCarousel').carousel('cycle');

        // ensures the optimizely object is defined globally using
        window['optimizely'] = window['optimizely'] || [];
        // sends a tracking call to Optimizely for the given event name. 
        window.optimizely.push(["trackEvent", "Vimeo paused"]);
    }

    function onPlay(id) {
        status.text('vimeo played!');
        $('#achievementsCarousel').carousel('pause');

        // ensures the optimizely object is defined globally using
        window['optimizely'] = window['optimizely'] || [];
        // sends a tracking call to Optimizely for the given event name. 
        window.optimizely.push(["trackEvent", "Vimeo played"]);
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
        event.stopPropagation();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul.nav li a').click(function() {
    $('.navbar-toggle:visible').click();
});
