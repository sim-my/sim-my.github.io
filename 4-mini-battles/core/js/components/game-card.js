export default class GameCard {
  constructor(gameImageSrc, x, y, width, height, context) {
    this.gameImageSrc = gameImageSrc;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
  }

  draw() {
    const game = new Image();
    game.src = this.gameImageSrc;
    this.context.drawImage(game, this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
  }

  onClick() {}
}
