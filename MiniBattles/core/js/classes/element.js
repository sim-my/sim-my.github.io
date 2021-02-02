import { detectRectangularCollision } from "../helpers/utils.js";

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

  update() {}

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollission(object, successCallback) {
    if (detectRectangularCollision(this, object)) {
      successCallback();
    }
  }
}
