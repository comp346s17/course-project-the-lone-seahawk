/**
* Source: https://www.w3schools.com/howto/howto_js_slideshow.asp
**/

$(document).ready(function() {
  var slideIndex = 1;
  showSlides(slideIndex);
  
  $('.next').click(function(){
    showSlides(slideIndex += 1);
  });

  $('.prev').click(function(){
    showSlides(slideIndex -= 1);
  });

  $('.dot').click(function(){
    showSlides(slideIndex = $('.dot').val());
    console.log($('.dot').val());
  });

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    
    timer = setTimeout(showSlides, 5000); // Change image every 4 seconds

    if (n > slides.length) {
      slideIndex = 1
      clearTimeout(timer); //resets timer 
    }

    if (n < 1) {
      slideIndex = slides.length
      clearTimeout(timer); //resets timer 
    }

    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }

    if (slideIndex > slides.length) {
      slideIndex = 1
    }    

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    timer;
    slideIndex++;
  }
});