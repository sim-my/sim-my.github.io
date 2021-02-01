import { playAudio } from "../../../../core/js/helpers/audio.js";
export default class Player {
  constructor(context, canvas, imageIdle, imageJump, x, keyCode) {
    this.context = context;
    this.canvas = canvas;
    this.x = x;
    this.y = this.canvas.height / 3;
    this.width = 120;
    this.height = 200;
    this.image = imageIdle;
    this.imageIdle = imageIdle;
    this.imageJump = imageJump;
    this.keyCode = keyCode;
    this.onTop = false;
    this.jump = false;
    this.topBoundary = (this.canvas.height * 2) / 3 - this.height;
    this.bottomBoundary = (this.canvas.height * 2) / 3;

    window.addEventListener("keypress", (event) => {this.keyPressHandler(event)});
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  
  move() {
    this.draw();
    if (!this.jump) {
      this.image = this.imageIdle;
    } else {
      this.image = this.imageJump;
      this.y -= 10;
    }
    this.handleJump();
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
    }
  }

  keyPressHandler(event){
    if (event.code === this.keyCode) {
      this.jump = true;
    }
  }
}
