import Player from "../../../../core/js/classes/player.js";

export default class TimbermanPlayer extends Player {
  constructor(
    x,
    y,
    width,
    height,
    imageIdle,
    imageJump,
    canvas,
    context,
    keyCode
  ) {
    super(x, y, width, height, imageIdle, canvas, context);
 
    this.imageIdle = imageIdle;
    this.imageJump = imageJump;
    this.keyCode = keyCode;
    
    this.onTop = false;
    this.jump = false;
    this.blinking = false;
    this.frequency = 200;

    this.topBoundary = this.canvas.height - (this.height * 5) / 4 - this.height;
    this.bottomBoundary = this.canvas.height - (this.height * 5) / 4;

    window.addEventListener("keypress", (event) => {   
      this.keyPressHandler(event);
    });
  }

  move() {
    if (!this.blinking || Math.floor(Date.now() / this.frequency) % 2) {
      this.draw();
    }

    if(this.jump){
      this.y -= 10;
    }
    this.handleJump();
  }

  blink() {
    this.blinking = true;
  }

  stopBlink() {
    this.blinking = false;
  }

  handleJump() {
    if (this.y <= this.topBoundary) {
      this.onTop = true;
    }
    if (this.onTop) {
      this.y += 10;
      this.jump = false;
    }
    if (this.y >= this.bottomBoundary) {
      this.onTop = false;
      this.image = this.imageIdle;
    }
    else{
      this.image = this.imageJump;
    }
  }

  keyPressHandler(event) {
    if (event.code === this.keyCode) {
      this.jump = true;
    }
  }
}
