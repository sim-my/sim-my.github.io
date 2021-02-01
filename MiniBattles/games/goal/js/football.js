import {
  detectRectangularCollision,
  resolveOneWayCollision,
} from "../../../core/js/helpers/utils.js";

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
    this.mass = 1;
    this.context = context;
    this.friction = 0.8;
    // this.dr = getRandomNumber(-0.2, -0.2);
    // this.r = getRandomNumber(Math.PI * 2);
    this.xr = 0;
    this.xy = 0;
    this.velocity = {
      x: 0,
      y: 0,
    };
    /**
     * To keep things into the frame
     * These values are substracted from right and top
     * And compares for left and bottom
     */
    this.xRightFrameOffset = 145;
    this.xLeftFrameOffset = 82;
    this.yBottomFrameOffset = 0;
    this.yTopFrameOffset = 145;

    this.initialX = x;
    this.initialY = y;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(player1, player2) {
    this.draw();
    this.collision(player1, player2);
    /** Border Collission */
    if (
      this.x - this.width <= this.xLeftFrameOffset ||
      this.x + this.width >= innerWidth - this.xRightFrameOffset
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.y - this.height <= this.yBottomFrameOffset ||
      this.y + this.height >= innerHeight - this.yTopFrameOffset
    ) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // console.log("Velocity of ball");
    // console.log(this.velocity.x);
    // console.log(this.velocity.y);

    // /** Continously reduce velocity */
    // if (this.velocity.x > 0) {
    //   this.velocity.x -= 0.11;
    // }
    // if (this.velocity.y > 0) {
    //   this.velocity.y -= 0.11;
    // }
   
  }

  collision(player1, player2) {
    if (detectRectangularCollision(player1, this)) {
      // console.log("Colliding player 1");

      resolveOneWayCollision(player1, this);
    }

    if (detectRectangularCollision(player2, this)) {
      // console.log("Colliding player 2");

      resolveOneWayCollision(player2, this);
    }
    // console.log("Plauers");
    // console.log(player1);
    // console.log(player2);
  }

  reset(){
    this.x = this.initialX;
    this.y = this.initialY;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
}
