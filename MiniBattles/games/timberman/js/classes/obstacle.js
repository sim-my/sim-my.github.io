import Element from '../../../../core/js/classes/element.js';

export default class Obstacle extends Element {
  constructor(canvas, context,image, x, y, width, height, direction) {
    super(canvas, context, image, x, y, width, height)
    this.direction = direction;

    this.radians = 0;
    this.angleChange = 0.2;
    this.obstacleCollide = false;
    this.obstacleSlide = false;
    this.initialX = this.x;
    this.topBoundary = (this.canvas.height * 3) / 4;
    this.bottomBoundary = this.canvas.height - this.height * 4/ 3;
  }
  
  draw() {
    this.radians += this.direction * this.angleChange;
    this.context.translate(this.x, this.y);
    this.context.rotate(this.radians);
    this.context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.context.rotate(-this.radians);
    this.context.translate(-this.x, -this.y);
  }

  move(dx = 0, dy = 0) {
    this.draw();
    this.x += dx;
    this.y += dy;
  }

  handleFall() {
    if (!this.obstacleCollide) {
      this.move(0, 10);
    }
    if (this.y >= this.topBoundary && this.y < this.bottomBoundary) {
      this.obstacleCollide = true;
      this.obstacleSlide = true;
      this.slideObstacle();
    }
    if (this.y >= this.bottomBoundary) {
      this.obstacleSlide = false;
      this.move(this.direction * 8, 0);
    }

    this.removeObstacleIfOutsideFrame();
  }

  slideObstacle() {
    if (this.obstacleSlide) {
      this.move(this.direction * 5, 5);
    }
  }

  resetObstacle() {
    this.x = this.initialX;
    this.y = 200;
    this.obstacleCollide = false;
  }

  removeObstacleIfOutsideFrame() {
    if (this.isOutsideFrame()) {
      this.resetObstacle();
    }
  }

 isOutsideFrame() {
    return this.x > this.canvas.width || this.x < -70 ? true : false;
  }
}

