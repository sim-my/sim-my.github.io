/**
 * Preloads all images, useful for starting the game after all images are preloaded
 * @param {arrau} urls
 * @param {callback} allImagesLoadedCallback
 */
export const preloadImages = (urls, allImagesLoadedCallback) => {
  const preloadImage = (url, anImageLoadedCallback) => {
    var image = new Image();
    image.onload = anImageLoadedCallback();
    image.src = url;
  };
  let loadedCounter = 0;
  let toBeLoadedNumber = urls.length;
  urls.forEach(function (url) {
    preloadImage(url, function () {
      loadedCounter++;
      if (loadedCounter == toBeLoadedNumber) {
        allImagesLoadedCallback();
      }
    });
  });
};

export const detectRectangularCollision = (rect1, rect2) => {
      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      ) {
        return true;
      }
};
