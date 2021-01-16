const imageCount = 4;
const images = document.querySelectorAll(".carousel-container img");
const dots = document.querySelectorAll(".dot");
const width = 800;
const leftMoveCount = 20;

let currentIndex = 0;

const setImagePosition = (imageCount) => {
  const imageArray = [];
  const dotsArray = [];
  for (let i = 0; i < imageCount; i++) {
    let image = images[i];
    let dot = dots[i];
    image.style.left = i * width + "px";
    imageArray.push(image);
    dotsArray.push(dot);
  }

  return [imageArray, dotsArray];
};
const [imageArray, dotsArray] = setImagePosition(4);

const setActiveDot = () => {
  dotsArray.forEach((dot, index) => {
    dot.classList.remove("active");
  });
  dotsArray[currentIndex].classList.add("active");
};

setActiveDot();

const animateNext = () => {
  currentIndex++;
  if (currentIndex > imageArray.length -1 ) {
    currentIndex = 0;
  }
  setActiveDot();
  let count = 200;
  imageArray.forEach((image, index) => {
    let imgLeft = parseInt(image.style.left);
    let current = imgLeft;
    if (currentIndex == 0) {      
      var setImgBoundary = setInterval(() => {
        imgLeft = imgLeft + count;
        image.style.left = imgLeft + "px";
        if (current + (imageArray.length - 1) * width <= imgLeft) {
          clearInterval(setImgBoundary);
        }
      }, 100/imageArray.length);
     
    }
    else{
    var setImgPos = setInterval(() => {
      image.style.left = imgLeft + "px";
      imgLeft = imgLeft - count;
      if ((index - currentIndex) * width > imgLeft) {
        clearInterval(setImgPos);
      }
    }, 100);
  }
  });
};

const animatePrev = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imageArray.length - 1;
  }
  setActiveDot();

  let count = 200;
  imageArray.forEach((image, index) => {
    let imgLeft = parseInt(image.style.left);
    let current = imgLeft;

    if (currentIndex == imageArray.length - 1) {      
      var setImgBoundary = setInterval(() => {
        imgLeft = imgLeft - count;
        image.style.left = imgLeft + "px";
        if (imgLeft <= current - (imageArray.length - 1) * width) {
          clearInterval(setImgBoundary);
        }
      }, 100/imageArray.length);
     
    }
    else{
    var setImgPos = setInterval(() => {
      image.style.left = imgLeft + "px";
      imgLeft = imgLeft + count;
      if (imgLeft > (index - currentIndex) * width) {
        clearInterval(setImgPos);
      }
    }, 100);
  }
  });

};

const buttonNext = document.querySelector(".button-next");

buttonNext.addEventListener("click", animateNext);

const buttonPrev = document.querySelector(".button-prev");

buttonPrev.addEventListener("click", animatePrev);

const containerDot = document.querySelector(".dot-container");

for (let i = 0, len = containerDot.children.length; i < len; i++) {

  ((index) => {
    containerDot.children[i].onclick = () => {
      let prevIndex = currentIndex;
      currentIndex = index;

      let diff = currentIndex - prevIndex;
      console.log(diff);
      setActiveDot();
      let count =  200;
      imageArray.forEach((image, j) => {        
        let imgLeft = parseInt(image.style.left);
        let current = imgLeft; 
        var setImgPos = setInterval(() => {
          image.style.left = imgLeft + "px";          
          if(diff>=0) {
            imgLeft = imgLeft - count;  
            if (imgLeft < (current - (width*diff))) {
              clearInterval(setImgPos);
            }
          }   
          else{
            imgLeft = imgLeft + count;  
            console.log(current);
            if (imgLeft > (current - (width * diff))) {
              clearInterval(setImgPos);
            }
          }    

        }, 100);
      });
      
    };
  })(i);
}

