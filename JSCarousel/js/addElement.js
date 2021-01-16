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
  constructor(carouselId, instance, imageCount, width = 800) {
    this.carouselId = carouselId;
    this.instance = instance;
    this.imageCount = imageCount;
    this.width = width;
    this.currentIndex = 0;
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
        { right: "20px" },
        { top: "50%" },
        { height: "42px" },
        { width: "42px" },
        { fontSize: "24px" },
        { cursor: "pointer" },
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
        { left: "20px" },
        { top: "50%" },
        { height: "42px" },
        { width: "42px" },
        { fontSize: "24px" },
        { cursor: "pointer" },
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
        { bottom: "20px" },
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
    let count = 200;
    images.forEach((image, index) => {
      let imgLeft = parseInt(image.style.left);
      let current = imgLeft;
      if (this.currentIndex == 0) {
        var setImgBoundary = setInterval(() => {
          imgLeft = imgLeft + count;
          image.style.left = imgLeft + "px";
          if (current + (images.length - 1) * this.width <= imgLeft) {
            clearInterval(setImgBoundary);
          }
        }, 100 / images.length);
      } else {
        var setImgPos = setInterval(() => {
          image.style.left = imgLeft + "px";
          imgLeft = imgLeft - count;
          if ((index - this.currentIndex) * this.width > imgLeft) {
            clearInterval(setImgPos);
          }
        }, 100);
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

    let count = 200;
    images.forEach((image, index) => {
      let imgLeft = parseInt(image.style.left);
      let current = imgLeft;

      if (this.currentIndex == images.length - 1) {
        var setImgBoundary = setInterval(() => {
          imgLeft = imgLeft - count;
          image.style.left = imgLeft + "px";
          if (imgLeft <= current - (images.length - 1) * this.width) {
            clearInterval(setImgBoundary);
          }
        }, 100 / images.length);
      } else {
        var setImgPos = setInterval(() => {
          image.style.left = imgLeft + "px";
          imgLeft = imgLeft + count;
          if (imgLeft > (index - this.currentIndex) * this.width) {
            clearInterval(setImgPos);
          }
        }, 100);
      }
    });
  }

  animateDots() {
    let images = this.getImages();
    const containerDot = document.querySelector(
      `${this.carouselId} .dot-container-${this.instance}`
    );

    for (let i = 0, len = containerDot.children.length; i < len; i++) {
      ((index) => {
        containerDot.children[i].onclick = () => {
          let prevIndex = this.currentIndex;
          this.currentIndex = index;
          let diff = this.currentIndex - prevIndex;
          this.setActiveDot();
          let count = 200;
          images.forEach((image, j) => {
            let imgLeft = parseInt(image.style.left);
            let current = imgLeft;
            var setImgPos = setInterval(() => {
              image.style.left = imgLeft + "px";
              if (diff >= 0) {
                imgLeft = imgLeft - count;
                if (imgLeft < current - this.width * diff) {
                  clearInterval(setImgPos);
                }
              } else {
                imgLeft = imgLeft + count;
                if (imgLeft > current - this.width * diff) {
                  clearInterval(setImgPos);
                }
              }
            }, 100);
          });
        };
      })(i);
    }
  }

  createCarousel() {
    this.createNextButton();
    this.createPrevButton();
    this.createDotsContainer();
    this.createDots();
    this.setImagePosition();
    this.setActiveDot();
    this.animateDots();

    window[`buttonNext-${this.instance}`] = document.querySelector(`${this.carouselId} .button-next`);
    window[`buttonNext-${this.instance}`].addEventListener("click", () => this.animateNext());

    window[`buttonPrev-${this.instance}`] = document.querySelector(`${this.carouselId}  .button-prev`);
    window[`buttonPrev-${this.instance}`].addEventListener("click", () => this.animatePrev());
  }
}

const carousel = new Carousel("#carousel-container-1", 1, 4);
carousel.createCarousel();

const carousel1 = new Carousel("#carousel-container-2", 2, 4);
carousel1.createCarousel();
