import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";

export default class Player {
  constructor(
    name,
    x,
    y,
    width,
    height,
    radians,
    image,
    canvas,
    context,
    moveKey
  ) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.width = width;
    this.height = height;
    this.mass = 1;
    this.image = image;
    this.canvas = canvas;
    this.context = context;
    this.radians = radians;
    this.movePlayerKey = moveKey;
    this.velocity = {
      x: 10,
      y: 10,
    };

    this.initialVelocity = {
      x: 10,
      y: 10
    }

    this.yOffset = -50;
    this.angleChange = 0.1;
    this.rotates = true;

    /**
     * To keep things into the frame
     * These values are substracted from right and top
     * And are compared for left and bottom
     */
    this.xRightFrameOffset = 122;
    this.xLeftFrameOffset = 145;
    this.yBottomFrameOffset = 145;
    this.yTopFrameOffset = -60;

    this.initialX = x;
    this.initialY = y;

    window.addEventListener("keypress", (event) => {
      if (event.code === this.movePlayerKey) {
        this.rotates = false;
        
        /** Velocity keeps on increasing */
        this.velocity.x += 2;
        this.velocity.y += 2;

        this.movePlayer();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.rotates = true;

      /** Restore original velocity */
      this.velocity.x = this.initialVelocity.x;
      this.velocity.y = this.initialVelocity.y;
    });
  }

  draw() {}

  update(otherPlayer) {
    this.drawAndContinouslyRotatePlayer();
    this.onPlayerCollision(otherPlayer);
  }

  movePlayer() {
    /** Player 1 and Player 2 are exact opposites thus their motions should be reversed  */
    if (this.name === "Player1") {
      this.x += this.velocity.x * Math.cos(this.radians);
      this.y += this.velocity.y * Math.sin(this.radians);
    } else if (this.name === "Player2") {
      this.x += -(this.velocity.x * Math.cos(this.radians));
      this.y += -(this.velocity.y * Math.sin(this.radians));
    }
    

    this.drawAndContinouslyRotatePlayer();
  }

  drawAndContinouslyRotatePlayer() {
    if (this.rotates) {
      this.radians += this.angleChange;
    }

    this.limitPlayerToFrame();

    this.context.translate(this.x, this.y - this.yOffset);
    this.context.rotate(this.radians);
    this.context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.context.rotate(-this.radians);
    this.context.translate(-this.x, -(this.y - this.yOffset));
  }

  limitPlayerToFrame() {
    /** Do not let player move outside the frame
     * Set the current x and y to the frame coordinates
     */
    if (this.x - this.width <= this.xLeftFrameOffset) {
      this.x = this.xLeftFrameOffset + this.width;
      // console.log("X ko left");
    }

    if (this.x + this.width >= innerWidth - this.xRightFrameOffset) {
      this.x = innerWidth - this.xRightFrameOffset - this.width;
      // console.log("X ko left");
    }

    if (this.y - this.height <= this.yTopFrameOffset) {
      this.y = this.yTopFrameOffset + this.height;
      // console.log("Y ko top");
    }

    if (this.y + this.height >= innerHeight - this.yBottomFrameOffset) {
      this.y = innerHeight - this.yBottomFrameOffset - this.height;
      // console.log("Y ko bottom");
    }
    /**  */
  }

  onPlayerCollision(player) {
    if (detectRectangularCollision(this, player)) {
      this.x = player.x + this.width;
      this.y = player.y + this.height;
      // console.log("Player collission");
    }
  }

  reset(){
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
