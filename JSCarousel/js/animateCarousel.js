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
  if (currentIndex >= imageArray.length) {
    currentIndex = 0;
  }
  setActiveDot();
  let count = 200;
    imageArray.forEach((image, index) => { 
      let imgLeft = parseInt(image.style.left);
      if(currentIndex == 0){
        imgLeft = imgLeft + imageArray.length * width;
      }      
      var setImgPos = setInterval(() => {
      image.style.left = imgLeft + "px";
      imgLeft = imgLeft - count;
      if ((index - currentIndex) * width > imgLeft) {
        clearInterval(setImgPos);
      }
    }, 100);
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
      var setImgPos = setInterval(() => {
      image.style.left = imgLeft + "px";
      imgLeft = imgLeft +  count;

      if (imgLeft > (index - currentIndex) * width) {
        clearInterval(setImgPos);
      }
    }, 100);
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
      currentIndex = index;
      setActiveDot();
      imageArray.forEach((image, j) => {
        console.log(image.style.left);
        image.style.left = (j - index) * width + "px";
      });
    };
  })(i);
}

// setInterval(() => {
//   animateNext()
// }, 2000)
