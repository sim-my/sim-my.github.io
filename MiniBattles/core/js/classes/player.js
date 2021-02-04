export default class Player {
  constructor(x, y, width, height, image, canvas, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.canvas = canvas;
    this.context = context;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
