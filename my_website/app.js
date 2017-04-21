
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
    if (n > slides.length) {
      slideIndex = 1
    } 
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}
});