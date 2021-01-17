class Element {
  constructor(type, styleArray, parent, elClass, innerHTML) {
    this.type = type;
    this.styleArray = styleArray;
    this.parent = parent;
    this.elClass = elClass;
    this.innerHTML = innerHTML;
  }

  createElement() {
    let elem = document.createElement(this.type);
    elem.setAttribute("class", this.elClass);

    return elem;
  }

  addInnerHTML() {
    let elem = this.createElement();
    if (this.innerHTML) {
      elem.innerHTML = this.innerHTML;
    }

    return elem;
  }

  addStyles() {
    let elem = this.addInnerHTML();
    this.styleArray.forEach((styleEl) => {
      let styleKey = Object.keys(styleEl)[0];
      elem.style[styleKey] = Object.values(styleEl)[0];
    });

    return elem;
  }

  addRelativePosition() {
    document.querySelector(this.parent).style.position = "relative";
  }

  insertElement() {
    let elem = this.addStyles();
    document.querySelector(this.parent).appendChild(elem);
  }
}

// Carousel
class Carousel {
  constructor(obj) {
    this.carouselId = obj.carouselId;
    this.instance = obj.instance;
    this.imageCount = obj.imageCount;
    obj.width === undefined ? (this.width = 800) : (this.width = obj.width);
    obj.holdTime === undefined
      ? (this.holdTime = 1000)
      : (this.holdTime = obj.holdTime);
    obj.transitionTime === undefined
      ? (this.transitionTime = 2000)
      : (this.transitionTime = obj.transitionTime);
    this.currentIndex = 0;
    this.dotClicked = false;
  }

  styleCarousel() {
    window[`carousel-${this.instance}`] = document.querySelector(
      this.carouselId
    );
    window[`carousel-${this.instance}`].style.width = this.width + "px";
  }

  createNextButton() {
    window[`nextButton-${this.instance}`] = new Element(
      "button",
      [
        { outline: "none" },
        { border: "none" },
        { borderRadius: "50%" },
        { backgroundColor: "#000" },
        { color: "#fff" },
        { position: "absolute" },
        { right: "2.5%" },
        { top: "50%" },
        { height: "42px" },
        { width: "42px" },
        { fontSize: "24px" }
      ],
      this.carouselId,
      "button-next",
      "&raquo;"
    );
    window[`nextButton-${this.instance}`].addRelativePosition();
    window[`nextButton-${this.instance}`].insertElement();

    return window[`nextButton-${this.instance}`];
  }

  createPrevButton() {
    window[`prevButton-${this.instance}`] = new Element(
      "button",
      [
        { outline: "none" },
        { border: "none" },
        { borderRadius: "50%" },
        { backgroundColor: "#000" },
        { color: "#fff" },
        { position: "absolute" },
        { left: "2.5%" },
        { top: "50%" },
        { height: "42px" },
        { width: "42px" },
        { fontSize: "24px" }
      ],
      this.carouselId,
      "button-prev",
      "&laquo;"
    );
    window[`prevButton-${this.instance}`].addRelativePosition();
    window[`prevButton-${this.instance}`].insertElement();
  }

  createDotsContainer() {
    window[`dot-container-${this.instance}`] = new Element(
      "div",
      [
        { height: "20px" },
        { width: "auto" },
        { position: "absolute" },
        { bottom: "2.5%" },
        { left: "50%" },
        { transform: "translate(-50%, -50%)" },
      ],
      this.carouselId,
      `dot-container-${this.instance}`
    );
    window[`dot-container-${this.instance}`].addRelativePosition();
    window[`dot-container-${this.instance}`].insertElement();
  }

  createDots() {
    let dotsCount = this.imageCount;
    for (let i = 0; i < dotsCount; i++) {
      window[`dot-${this.instance}-${i}`] = new Element(
        "div",
        [
          { height: "15px" },
          { width: "15px" },
          { borderRadius: "50%" },
          { border: "1px solid #fff" },
          { zIndex: "99999" },
          { float: "left" },
          { marginRight: "10px" },
          { cursor: "pointer" },
        ],
        `.dot-container-${this.instance}`,
        "dot"
      );
      window[`dot-${this.instance}-${i}`].insertElement();
    }
  }

  getImages() {
    let images = document.querySelectorAll(`${this.carouselId} img`);
    return images;
  }

  getDots() {
    const dots = document.querySelectorAll(
      `${this.carouselId} .dot-container-${this.instance} .dot`
    );
    return dots;
  }

  setImagePosition() {
    let images = this.getImages();
    for (let i = 0; i < this.imageCount; i++) {
      let image = images[i];
      image.style.left = i * this.width + "px";
    }
  }

  setActiveDot() {
    let dots = this.getDots();
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
    });
    dots[this.currentIndex].classList.add("active");
  }

  animateNext() {
    let images = this.getImages();
    this.currentIndex++;
    if (this.currentIndex > images.length - 1) {
      this.currentIndex = 0;
    }
    this.setActiveDot();
    images.forEach((image, index) => {
      let imgLeft = parseInt(image.style.left);
      let current = imgLeft;
      let count = 20;
      if (this.currentIndex == 0) {
        let setImgBoundary = setInterval(() => {
          imgLeft = imgLeft + count;
          image.style.left = imgLeft + "px";
          if (current + (images.length - 1) * this.width <= imgLeft) {
            clearInterval(setImgBoundary);
          }
        }, this.transitionTime / ((this.width * images.length) / count));
      } else {
        let setImgPos = setInterval(() => {
          image.style.left = imgLeft + "px";
          imgLeft = imgLeft - count;
          if ((index - this.currentIndex) * this.width > imgLeft) {
            clearInterval(setImgPos);
          }
        }, this.transitionTime / (this.width / count));
      }
    });
  }

  animatePrev() {
    let images = this.getImages();
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = images.length - 1;
    }
    this.setActiveDot();

    let count = 20;
    images.forEach((image, index) => {
      let imgLeft = parseInt(image.style.left);
      let current = imgLeft;

      if (this.currentIndex == images.length - 1) {
        let setImgBoundary = setInterval(() => {
          imgLeft = imgLeft - count;
          image.style.left = imgLeft + "px";
          if (imgLeft <= current - (images.length - 1) * this.width) {
            clearInterval(setImgBoundary);
          }
        }, this.transitionTime / ((this.width * images.length) / count));
      } else {
        let setImgPos = setInterval(() => {
          image.style.left = imgLeft + "px";
          imgLeft = imgLeft + count;
          if (imgLeft > (index - this.currentIndex) * this.width) {
            clearInterval(setImgPos);
          }
        }, this.transitionTime / (this.width / count));
      }
    });
  }

  animateDots() {
    let images = this.getImages();
    window[`containerDot-${this.instance}`] = document.querySelector(
      `${this.carouselId} .dot-container-${this.instance}`
    );

    for (let i = 0, len = window[`containerDot-${this.instance}`].children.length; i < len; i++) {
      ((index) => {
        window[`containerDot-${this.instance}`].children[i].onclick = () => {
          window[`buttonPrev-${this.instance}`].disabled = true;
          window[`buttonNext-${this.instance}`].disabled = true;
          window[`containerDot-${this.instance}`].style.pointerEvents = "none";
          this.dotClicked = true;
          let prevIndex = this.currentIndex;
          this.currentIndex = index;
          let currentLeft = window[`containerDot-${this.instance}`].children[i].style.left;
          let diff = this.currentIndex - prevIndex;
          this.setActiveDot();
          let count = 20;
          images.forEach((image, j) => {
            let imgLeft = parseInt(image.style.left);
            let current = imgLeft;
            let setImgPos = setInterval(() => {
              image.style.left = imgLeft + "px";
              if (diff >= 0) {
                imgLeft = imgLeft - count;
                if (imgLeft < current - this.width * diff) {
                  clearInterval(setImgPos);
                  setTimeout(() => {
                    window[`buttonPrev-${this.instance}`].disabled = false;
                    window[`buttonNext-${this.instance}`].disabled = false;
                    window[`containerDot-${this.instance}`].style.pointerEvents = "auto";
                  },this.transitionTime);
                }
              } else {
                imgLeft = imgLeft + count;
                if (imgLeft > current - this.width * diff) {
                  clearInterval(setImgPos);
                  setTimeout(() => {
                    window[`buttonPrev-${this.instance}`].disabled = false;
                    window[`buttonNext-${this.instance}`].disabled = false;
                    window[`containerDot-${this.instance}`].style.pointerEvents = "auto";
                  }, this.transitionTime);
                }
              }
            }, this.transitionTime / (Math.abs(currentLeft - this.width * diff) / count));
          });
        };
      })(i);
    }
  }

  createCarousel() {
    this.styleCarousel();
    this.createNextButton();
    this.createPrevButton();
    this.createDotsContainer();
    this.createDots();
    this.setImagePosition();
    this.setActiveDot();
    this.animateDots();

    window[`buttonNext-${this.instance}`] = document.querySelector(
      `${this.carouselId} .button-next`
    );

    window[`buttonPrev-${this.instance}`] = document.querySelector(
      `${this.carouselId}  .button-prev`
    );
  }
  autoAnimate() {
    let animateMe = setInterval(() => {
      this.animateNext();
    }, this.holdTime + this.transitionTime);
    window[`buttonNext-${this.instance}`].addEventListener("click", () => {
      window[`buttonNext-${this.instance}`].disabled = true;
      window[`buttonPrev-${this.instance}`].disabled = true;
      window[`containerDot-${this.instance}`].style.pointerEvents = "none";
      clearInterval(animateMe);
      this.animateNext();
      setTimeout(() => {
        animateMe = setInterval(() => {
          this.animateNext();
        }, this.holdTime + this.transitionTime);
        window[`buttonPrev-${this.instance}`].disabled = false;
        window[`buttonNext-${this.instance}`].disabled = false;
        window[`containerDot-${this.instance}`].style.pointerEvents = "auto";
      }, this.transitionTime);
    });
    window[`buttonPrev-${this.instance}`].addEventListener("click", () => {
      window[`buttonPrev-${this.instance}`].disabled = true;
      window[`buttonNext-${this.instance}`].disabled = true;
      window[`containerDot-${this.instance}`].style.pointerEvents = "none";
      clearInterval(animateMe);
      this.animatePrev();
      setTimeout(() => {
        animateMe = setInterval(() => {
          this.animateNext();
        }, this.holdTime + this.transitionTime);
        window[`buttonPrev-${this.instance}`].disabled = false;
        window[`buttonNext-${this.instance}`].disabled = false;
        window[`containerDot-${this.instance}`].style.pointerEvents = "auto";
      }, this.transitionTime);
    });
  }
}

const carousel = new Carousel({
  carouselId: "#carousel-container-1",
  instance: 1,
  imageCount: 4,
  width: 400,
  holdTime: 4000,
  transitionTime: 4000,
});
carousel.createCarousel();
carousel.autoAnimate();

const carousel1 = new Carousel({
  carouselId: "#carousel-container-2",
  instance: 2,
  imageCount: 4,
});
carousel1.createCarousel();
carousel1.autoAnimate();
