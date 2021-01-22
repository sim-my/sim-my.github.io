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
