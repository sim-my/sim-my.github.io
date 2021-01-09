document.querySelector('.mobile-navigation-menu').addEventListener("click", openMobileNavigation);

function openMobileNavigation(){
    document.querySelector('.mobile-menu').style.display = 'block';
    disableScroll();

}

document.querySelector('.mobile-menu-header').addEventListener("click", closeMobileNavigation);

function closeMobileNavigation(){
    document.querySelector('.mobile-menu').style.display = 'none';
    enableScroll()
}
var slideIndex = 1;
showSlides(slideIndex);

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
function disableScroll() { 
  // Get the current page scroll position 
  scrollTop =  
    window.pageYOffset || document.documentElement.scrollTop; 
  scrollLeft =  
    window.pageXOffset || document.documentElement.scrollLeft, 

      // if any scroll is attempted, 
      // set this to the previous value 
      window.onscroll = function() { 
          window.scrollTo(scrollLeft, scrollTop); 
      }; 
} 

function enableScroll() { 
  window.onscroll = function() {}; 
}