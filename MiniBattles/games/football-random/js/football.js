export default class Football {
  constructor(x, y, width, height, image, canvas, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.image = image;
    this.height = height;
    this.canvas = canvas;
    this.dy = 1;
    this.gravity = 1;
    this.context = context;
    this.friction = 0.8;
  }

  draw() {
    console.log(this.image);
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.bounce();
  }

  bounce() {
    /** The ball doesnt exactly stop at the center
     * The value below is where you want the ball to bounce and stop at the y direction
      */
    let toMiddleGround = 180;
    let middleY = this.canvas.height / 2 + toMiddleGround;
    console.log(this.y);
    console.log(this.canvas.height + this.height);
    if (this.y + this.height > middleY ) {
      this.dy = -this.dy * this.friction;
    }else{
        this.dy += this.gravity;
    }
    this.y += this.dy;
  }
}
