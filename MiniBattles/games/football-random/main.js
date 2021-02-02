import Game from "../../core/js/classes/Game.js";
import Football from "../../games/goal/js/football.js";

export default class Goal extends Game {
  constructor(canvas, gameData) {
    super(canvas, gameData);
    this.football;
  }

  start() {
    super.start();
    // this.football.draw();
    this.setBackground(this.assets.background);
    this.football.update();
  }

  init() {
    super.init();
    console.log("After init");
    console.log(this.assets);

    this.football = this.createFootBall(this.assets.football);

  }

  drawFootBall() {}

  setBackground(bgImage) {
    this.context.drawImage(
      bgImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  createFootBall(footballImage) {
    let footballWidth = 60;
    let footballHeight = 60;
    // Spawn at center

    /**
     * The ball doesnt look exactly on the center, because of the image
     * The number changes how far the ball is from the center of canvas
     */
    let ballDistanceFromCenter = 21;
    let x = this.canvas.width / 2 - (footballWidth / 2) + ballDistanceFromCenter;
    /**
     * The number changes from how far up you want the ball to bounce
     */
    let bounceHeightFromCenter = 200;
    let y = this.canvas.height / 2 - bounceHeightFromCenter;
    

    const football = new Football(
      x,
      y,
      footballWidth,
      footballHeight,
      footballImage,
      this.canvas,
      this.context
    );

    return football;
  }

  moveBall() {}
}
