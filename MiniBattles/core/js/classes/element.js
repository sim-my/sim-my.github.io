import { detectRectangularCollision } from '../helpers/utils.js';

export default class Element {
  constructor(canvas, context, image, x, y, width, height) {
    this.context = context;
    this.image = image;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollission(object, successCallback, thisDx = 0, thisDy = 0, objectDx = 0, objectDy = 0) {
    if (detectRectangularCollision(this, object, thisDx, thisDy, objectDx, objectDy)) {
      successCallback();
    }
  }
}
