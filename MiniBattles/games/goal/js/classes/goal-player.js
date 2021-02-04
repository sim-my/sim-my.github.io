import Player from "../../../../core/js/classes/player.js";
import { detectRectangularCollision } from '../../../../core/js/helpers/utils.js';

export default class GoalPlayer extends Player {
  constructor(
    x,
    y,
    width,
    height,
    radians,
    image,
    canvas,
    context,
    faceDirection,
    moveKey
  ) {
    super(x, y, width, height, image, canvas, context);
    this.mass = 1;
    this.radians = radians;
    this.movePlayerKey = moveKey;
    this.faceDirection = faceDirection;
    this.velocity = {
      x: 10,
      y: 10,
    };

    this.initialVelocity = {
      x: 10,
      y: 10,
    };

    this.yOffset = -50;
    this.angleChange = 0.1;
    this.rotates = true;
    this.playerMoves = false;

    /**
     * To keep things into the frame
     * These values are substracted from right and top
     * And are compared for left and bottom
     */
    this.xRightFrameOffset = 122;
    this.xLeftFrameOffset = 145;
    this.yBottomFrameOffset = 145;
    this.yTopFrameOffset = -55;

    this.initialX = x;
    this.initialY = y;

    window.addEventListener('keypress', (event) => {
      if (event.code === this.movePlayerKey) {
        this.rotates = false;
        this.playerMoves = true;

        // Velocity keeps on increasing
        if (this.playerMoves) {
          this.velocity.x += 2;
          this.velocity.y += 2;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.rotates = true;
      this.playerMoves = false;

      // Restore original velocity
      this.velocity.x = this.initialVelocity.x;
      this.velocity.y = this.initialVelocity.y;
    });
  }

  update(otherPlayer) {
    this.draw();
    this.onPlayerCollision(otherPlayer);
    if (this.playerMoves) {
      this.movePlayer();
    }
  }

  movePlayer() {
    // Face Direction reverses their motion should be reversed
    let direction = this.faceDirection;
    this.x += direction * (this.velocity.x * Math.cos(this.radians));
    this.y += direction * (this.velocity.y * Math.sin(this.radians));

    this.draw();
  }

  draw() {
    if (this.rotates) {
      this.radians += this.angleChange;
    }

    this.limitPlayerToFrame();
    this.rotatePlayer();
  }

  rotatePlayer() {
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
    }

    if (this.x + this.width >= innerWidth - this.xRightFrameOffset) {
      this.x = innerWidth - this.xRightFrameOffset - this.width;
    }

    if (this.y - this.height <= this.yTopFrameOffset) {
      this.y = this.yTopFrameOffset + this.height;
    }

    if (this.y + this.height >= innerHeight - this.yBottomFrameOffset) {
      this.y = innerHeight - this.yBottomFrameOffset - this.height;
    }
  }

  onPlayerCollision(player) {
    if (detectRectangularCollision(this, player)) {
      this.x = player.x + this.width;
      this.y = player.y + this.height;
    }
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
