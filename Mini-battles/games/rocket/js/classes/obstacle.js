//key is 0 for red, 1 for blue

import { detectRectangularCollision } from "../../../../core/js/helpers/utils.js";
import Element from "../../../../core/js/classes/Element.js"
export default class Obstacle extends Element {
  constructor(canvas, context, image, x, y, w, h, key) {
    super(canvas, context, image, x, y, w, h);

    this.key = key;

    this.blast = false;
  }

  move() {
    this.draw();
    this.x -= 10;
  }

}

