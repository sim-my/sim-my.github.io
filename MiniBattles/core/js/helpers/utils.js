export const detectRectangularCollision = (
  rect1,
  rect2,
  dxRect1 = 0,
  dyRect1 = 0,
  dxRect2 = 0,
  dyRect2 = 0
) => {
  if (
    rect1.x < rect2.x + rect2.width + dxRect2 &&
    rect1.x + dxRect1 + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height + dyRect2 &&
    rect1.y + rect1.height + dyRect1 > rect2.y
  ) {
    return true;
  }
};

/**
 * Checks and returns true on the first collisiion
 *
 * @param Object | rect1
 * @param Object | rect2
 * @return Boolean
 */
let cooldown = false;
let timeout;

export const oneTimeRectangularCollision = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y &&
    !cooldown
  ) {
    cooldown = true;
    timeout = setTimeout(function () {
      cooldown = false;
     }, 500);
    return true;
  }
};

export const increaseScore = (scoreDom) => {
  let updatedScore = parseInt(scoreDom.innerHTML);
  updatedScore++;
  scoreDom.innerHTML = updatedScore;
};

/**
 * Sets ball velocity after collison with player
 *
 * @param Object | Ball
 * @param Object | Player
 */
export const setBallPlayerVelocity = (ball, player) => {
  let collidedPoint = ball.y - (player.y + player.height / 2);

  collidedPoint = collidedPoint / (player.height / 2);

  let angleRad = (Math.PI / 4) * collidedPoint;

  let xDirection = player.x > ball.x ? -1 : 1;
  let yDirection = player.y < ball.y ? -1 : 1;

  ball.velocity.x =
    xDirection * (ball.speed + player.velocity.x / 2) * Math.cos(angleRad);
  ball.velocity.y =
    yDirection * (ball.speed + player.velocity.y / 2) * Math.sin(angleRad);

  if (ball.speed > 1) {
    ball.speed -= 0.1;
  }
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Preloads all images
 *
 * @param Array | assets
 * @return Array | finalImages | Loaded Images
 */
export const preloadImages = (assets) => {
  let imageLoaded = false;
  let finalImages = {};
  let imagesOK = 0;

  for (let i = 0; i < assets.length; i++) {
    let img = new Image();
    finalImages[assets[i].name] = img;
    img.onload = function () {
      imagesOK++;
      if (imagesOK >= assets.length) {
        imageLoaded = true;
      }
    };
    img.src = assets[i].src;
  }
  if ((imageLoaded = true)) {
    return finalImages;
  }
};

export const getSoundsObject = (soundsArray) => {
  let soundsObject = {};
  for (let i = 0; i < soundsArray.length; i++) {
    let name = soundsArray[i].name;
    let src = soundsArray[i].src;
    soundsObject[name] = src;
  }
  return soundsObject;
};

export const getCombinedAssets = (assetsArray) => {
  let soundObj = getSoundsObject(assetsArray.sounds);
  let imageObj = preloadImages(assetsArray.images);
  return { images: imageObj, sounds: soundObj };
};

export const getWidth = (value, ratio) => {
  return value * ratio;
};
