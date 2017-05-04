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

            setTimeout(showSlides, 4000); // Change image every 4 seconds
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

/**
* Packery.js for grid view
**/

    // initalize Packery after all images have loaded
    var $grid = $('.grid').imagesLoaded( function() {
        $grid.packery({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
        });
        // make all items draggable
        var $items = $grid.find('.grid-item').draggable();
        // bind drag events to Packery
        $grid.packery( 'bindUIDraggableEvents', $items );
    });  

    $grid.on('click', '.grid-item', function( event ) {
        // change size of item by toggling large class
        $(event.currentTarget).toggleClass('grid-item--large');
        // trigger shiftLayout after item size changes
        $grid.packery('layout');
    });

/**
* Filter gallery photos by series name
**/
    var removedItems = [];

    $('.filter-search').change(function(){
        $.ajax({
            type:   "GET",
            url:    "/gallery/",

            success: function(response) {
                // Add back any previously deleted items
                console.log(removedItems.length);
                for (i = 0; i < removedItems.length; i++) {
                    // console.log(removedItems[i]);
                    var itemHtml = '<li class="grid-item">' + removedItems[i] + '</li>';
                    // console.log(itemHtml);
                    var $item = $(itemHtml);
                    $grid.append($item).packery('appended', $item);

                    // apply draggable again
                    var $items = $grid.find('.grid-item').draggable();
                    $grid.packery( 'bindUIDraggableEvents', $items );
                }

                // Clear out deletedItems list
                removedItems = [];
                console.log(removedItems.length);

                //Show only the filtered photos
                var filter = $('.filter-search').val().replace(/\s+/g, '');
                // console.log(filter);
                
                // if any filter is selected (not "ALL")
                if (filter != -1) {
                    var elems = $('.grid-item');
                    // console.log(elems);
                    jQuery.each(elems, function(i, val) {
                        var series = $(val).children('.img-series').text().replace(/\s+/g, '');
                        if (series != filter) {
                            // keep track of the deleted items
                            removedItems.push($(val).html());
                            // delete item for both packery and html
                            $grid.packery('remove', $(val))
                            $(val).remove();
                        }
                    });
                }
                $grid.packery('shiftLayout');
            }
        });
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