$(document).ready(function() {

    var url = window.location.href;

/**
* Automatic sldieshow (landing page)
* Referece: https://www.w3schools.com/howto/howto_js_slideshow.asp
**/ 
    if (url == 'http://127.0.0.1:8000/') { /***** CHANGE THE URL AFTER PUBLISHING *****/

        var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("slide");
            
            // Hide all slides
            for (var i = 0; i < slides.length; i++) {
               slides[i].style.display = "none";  
            }

            // Show one slide
            slideIndex++;

            if (slideIndex >= slides.length) {
                slideIndex = 1;
            }

            slides[slideIndex-1].style.display = "block";

            setTimeout(showSlides, 4000); // Change image every 3 seconds
        }
    }

/**
* Show the filter dropdown option on gallery page
**/

    if (url == 'http://127.0.0.1:8000/gallery/') { /***** CHANGE THE URL AFTER PUBLISHING *****/
        $('.filter-search').css('display', 'block');
    }
/**
* Get photos from an instagram page
* Reference: https://rudrastyh.com/javascript/get-photos-from-instagram.html
**/

    var token = '1474524100.4b639ca.744f43fdca194b00a7983be095508cec',
        userid = 'tenichiliu',
        num_photos = 20; // max 20 photos for sandbox mode
     
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent', // or /users/self/media/recent for Sandbox
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
            console.log(data);
            for( x in data.data ){
                $('.insta-img').append('<li><a href="' + data.data[x].link + '"><img src="' + data.data[x].images.standard_resolution.url + '"></a></li>'); // URL of image 612х612
                // data.data[x].images.thumbnail.url - URL of image 150х150
                // data.data[x].images.low_resolution.url - URL of image, 306х306
                // data.data[x].link - Instagram post URL 
            }
        },
        error: function(data){
            console.log(data); // send the error notifications to console
        }
    });

// /**
// * Filter gallery photos by series name
// **/

//     $.ajax({
//         type:   "POST",
//         url:    "/gallery/",

//         success: function(response) {
//             var filter = $('.filter-search').val();
//             console.log(filter);
//         }
//     });

/**
* Mansory.js for grid view
**/

    // init Masonry after all images have loaded
    var $grid = $('.grid').imagesLoaded( function() {
        $grid.masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
        });
        // .sortable({
        //     start: function (e, ui) {
        //         ui.item.removeClass('grid-item');
        //         $(".grid").masonry('reload');
        //     },
        //     change: function (e, ui) {
        //         $(".grid").masonry('reload');
        //     },
        //     stop: function (e, ui) {
        //         ui.item.addClass('grid-item');
        //         $(".grid").masonry('reload');
        //     }
        // }); 
    });  

/**
* Show or hide dropdown menu
**/

    $('#dropdown-button').click(function() {
        var menu = $('.dropdown-menu');
        var button = $('#dropdown-button');

        if (menu.css('display') == 'none') {
            menu.css('display','block');
            button.text('✕');
        } 
        else {
            menu.css('display','none');
            button.text('☰');
        }
    })

/**
* Add scrolling animation for clicking scroll arrow on slideshow
**/

    var scrollAnimation = function(){
        $("html, body").animate({
            scrollTop: $(".scroll-target").offset().top
        }, 1500); /* milliseconds */
    };

    $('.scroll-arrow').on('click', scrollAnimation);

});