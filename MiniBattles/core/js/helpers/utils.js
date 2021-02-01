/**
 * Preloads all images, useful for starting the game after all images are preloaded
 *
 * @param Array | Array with image Urls
 * @return Object | Image object with key values
 */
export const preloadImages = (imageUrlsArray) => {
  let loadedCounter = 0;
  let toBeLoadedNumber = imageUrlsArray.length;

  let loadedImageObject = {};

  imageUrlsArray.forEach((imageObject) => {
    let name = imageObject.name;
    let url = imageObject.src;

    let image = new Image();
    image.src = url;

    loadedCounter++;

    loadedImageObject[name] = image;
  });

  return loadedCounter == toBeLoadedNumber ? loadedImageObject : false;
};

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

export const rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
};

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

export const resolveCollision = (particle, otherParticle) => {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  let collidedVelocity = {}

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Return Velocity Object
    collidedVelocity = {
      vFinal1,
      vFinal2,
    };

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;

    // console.log(collidedVelocity);
    
  }

  return collidedVelocity;
};

export const resolveOneWayCollision = (particle, particleToMove) => {
  let velocityObj = resolveCollision(particle, particleToMove);

  // let finalVelocityOfParticle = velocityObj.vFinal2;

  // particleToMove.velocity.x = finalVelocityOfParticle.x;
  // particleToMove.velocity.y = finalVelocityOfParticle.y;
};

export const detectRectangularCollision = (rect1, rect2, dxRect1 = 0, dyRect1 = 0, dxRect2 = 0, dyRect2 = 0) => {
  if (
    rect1.x < rect2.x + rect2.width + dxRect2 &&
    rect1.x + dxRect1 + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height + dyRect2 &&
    rect1.y + rect1.height + dyRect1 > rect2.y
  ) {
    return true;
  }
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// put the paths to your images in imageURLs[]

// the loaded images will be placed in imgs[]



export const loadingAllImages = (assets) => {
  let imageLoaded = false;
  let finalImages = {};
  let imagesOK = 0;

  for (var i=0; i<assets.length; i++) {
    let img = new Image();
    finalImages[assets[i].name] = img;
    img.onload = function(){ 
      imagesOK++; 
      if (imagesOK >= assets.length ) {
        imageLoaded = true;
      }
    };
    img.src = assets[i].src;
  }    
  if(imageLoaded = true){
    return finalImages;
  } 
}

