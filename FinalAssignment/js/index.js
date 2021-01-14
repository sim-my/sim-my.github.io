document.querySelector('.search-field').style.display = 'none';
document
  .querySelector(".mobile-navigation-menu")
  .addEventListener("click", openMobileNavigation);

function openMobileNavigation() {
  document.querySelector(".mobile-menu").style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

document
  .querySelector(".mobile-menu-header")
  .addEventListener("click", closeMobileNavigation);

function closeMobileNavigation() {
  document.querySelector(".mobile-menu").style.display = "none";
  document.querySelector("body").style.overflow = "auto";
}

document
  .querySelector(".search-bar-icon")
  .addEventListener("click", handleSearchBar);
function handleSearchBar() {

  if(document.querySelector(".search-field").style.display == "none"){
    document.querySelector(".search-field").style.display = "block";
    document.querySelector(".search-bar-icon img").setAttribute('src', 'images/cancel.png');
    document.querySelector(".search-bar-icon img").style.height = '50px';
    document.querySelector(".search-bar-icon img").style.width = '50px';
    document.querySelector(".search-bar-icon").style.top = '35px';
  }
  else{
    document.querySelector(".search-field").style.display = "none";
    document.querySelector(".search-bar-icon img").setAttribute('src', 'images/search-icon.png');
    document.querySelector(".search-bar-icon img").style.height = '30px';
    document.querySelector(".search-bar-icon img").style.width = '30px';
    document.querySelector(".search-bar-icon").style.top = '43px';
  }
  
}

var slideIndex = 1;
showSlides(slideIndex);

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000);
}
document
  .querySelector(".search-bar-icon")
  .addEventListener("click", handleSearchBar);

