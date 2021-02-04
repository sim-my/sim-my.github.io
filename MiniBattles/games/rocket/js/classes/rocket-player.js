import Player from '../../../../core/js/classes/player.js';

export default class RocketPlayer extends Player {
  constructor(x, y, width, height, image, canvas, context) {
    super(x, y, width, height, image, canvas, context);
    this.rocketSpeed = 5;
    this.rightBoundary = this.canvas.width - this.width;
  }

  move() {
    this.draw();
    this.x += this.rocketSpeed;
    if (this.x > this.rightBoundary) {
      this.x = 0;
    }
  }
}
