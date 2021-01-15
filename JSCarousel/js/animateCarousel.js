const imageCount = 4;
const images = document.querySelectorAll(".carousel-container img");
const dots = document.querySelectorAll(".dot");
const width = 800;

let currentIndex = 4;

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
  dotsArray[currentIndex % dotsArray.length].classList.add("active");
};
setActiveDot();
const animateNext = () => {
  currentIndex++;
  setActiveDot();
  imageArray.forEach((image, index) => {
    image.style.left =
      ((index - currentIndex) % imageArray.length) * width + "px";
  });
};

const animatePrev = () => {
  currentIndex--;
  setActiveDot();
  imageArray.forEach((image, index) => {
    image.style.left =
      ((index + currentIndex) % imageArray.length) * width + "px";
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
        image.style.left = ((j + index) % imageArray.length) * width + "px";
      });
    };
  })(i);
}
