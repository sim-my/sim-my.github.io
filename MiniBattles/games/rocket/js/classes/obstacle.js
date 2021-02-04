//key is 0 for red, 1 for blue

import Element from '../../../../core/js/classes/element.js';
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

