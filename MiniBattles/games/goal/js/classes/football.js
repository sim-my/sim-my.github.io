import {playAudio} from '../../../../core/js/helpers/audio.js';
import {setBallPlayerVelocity,oneTimeRectangularCollision} from '../../../../core/js/helpers/utils.js';
export default class Football {
  constructor(x, y, width, height, radians, image, canvas, context, sounds) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.image = image;
    this.height = height;
    this.radius = width;
    this.canvas = canvas;
    this.radians = radians;
    this.sounds = sounds;

    this.context = context;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 1;
    /**
     * To keep things into the frame
     * These values are substracted from right and top
     * And compares for left and bottom
     */
    this.xRightFrameOffset = 145;
    this.xLeftFrameOffset = 102;
    this.yBottomFrameOffset = 145;
    this.yTopFrameOffset = 30;

    this.angleChange = 0.2;

    this.initialX = x;
    this.initialY = y;
  }

  draw() {
    this.drawAndContinouslyRotate();
  }

  drawAndContinouslyRotate() {
    this.radians += this.angleChange;

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

  update(player1, player2) {
    this.draw();
    this.collision(player1, player2);
    
    this.borderCollision(); 
    
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  borderCollision(){
    if (
      this.x - this.width <= this.xLeftFrameOffset ||
      this.x + this.width >= innerWidth - this.xRightFrameOffset
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.y - this.height <= this.yTopFrameOffset ||
      this.y + this.height >= innerHeight - this.yBottomFrameOffset
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }

  

  collision(player1, player2) {
    if (oneTimeRectangularCollision(this, player1)) {
      playAudio(this.sounds.kick);
      setBallPlayerVelocity(this, player1);
    }

    if (oneTimeRectangularCollision(this, player2)) {
      playAudio(this.sounds.kick);
      setBallPlayerVelocity(this, player2);
    }
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
}
