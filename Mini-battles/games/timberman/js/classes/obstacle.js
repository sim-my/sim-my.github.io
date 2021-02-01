export default class Obstacle {
  constructor(context, canvas, x, y, width, height, images) {
    this.context = context;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images;
    this.obstacleCollide = false;
    this.obstacleSlide = false;
    this.obstacleFrame = 0;
    this.obstacleIndex = 0;
    this.initialX = this.x;
    this.image = this.images[this.obstacleIndex];
    this.topBoundary = (this.canvas.height * 3) / 4;
    this.bottomBoundary = this.canvas.height - 100;
  }
  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(dx = 0, dy = 0, newImage = this.image) {
    this.draw();
    this.x += dx;
    this.y += dy;
    this.image = newImage;
  }

  handleFall(direction) {
    this.image = this.images[this.obstacleIndex];
    if (!this.obstacleCollide) {
      this.move(0, 10);
    }
    if (this.y >= this.topBoundary && this.y < this.bottomBoundary) {
      this.obstacleCollide = true;
      this.obstacleSlide = true;
      this.slideObstacle(direction);
    }
    if (this.y >= this.bottomBoundary) {
      this.obstacleSlide = false;
      if (this.obstacleFrame % 5 === 0) {
        this.obstacleIndex = (this.obstacleFrame / 5) % this.images.length;
      }
      this.move(direction * 8, 0, this.image);
      this.obstacleFrame++;
    }

    this.removeObstacleIfOutsideFrame();
  }
  slideObstacle(direction) {
    if (this.obstacleSlide) {
      this.move(direction * 5, 5);
    }
  }

  resetObstacle() {
    this.x = this.initialX;
    this.y = 200;
    this.obstacleCollide = false;
  }

  removeObstacleIfOutsideFrame() {
    if (this.x > this.canvas.width || this.x < -70) {
      this.resetObstacle();
    }
  }
}
