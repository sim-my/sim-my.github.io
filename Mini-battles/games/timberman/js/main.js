import Game from "../../../core/js/classes/game.js";
import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";

import { playAudio } from "../../../core/js/helpers/audio.js";
import { imageList } from "../js/utility/imageLoader.js";

import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";

let frequency = 200;

export default class Timberman extends Game {
  constructor(
    game,
    canvas,
    context,
    gameData,
    gameScoreBoard,
    gameEndScreen,
    homePage
  ) {
    super(canvas, context, gameData, gameScoreBoard, gameEndScreen);
    this.game = game;
    this.gameRun = true;
    this.blueBlinking = false;
    this.redBlinking = false;
    this.finalPoint = 5;

    this.homePage = homePage;

    this.images = imageList();
    this.bluePlayer = this.setBluePlayer();
    this.redPlayer = this.setRedPlayer();
    this.redObstacle = this.generateRedObstacle();
    this.blueObstacle = this.generateBlueObstacle();
  }

  start() {
    super.start();
    this.setBackground();
    this.setLogPile();
    this.moveBluePlayer();
    this.moveRedPlayer();
    this.moveRedObstacle();
    this.moveBlueObstacle();
    this.detectRedObstacleCollision();
    this.detectBlueObstacleCollision();
  }

  init() {
    super.init();
  }

  setBluePlayer() {
    let imgIdle, imgJump;
    imgIdle = this.images.bluePlayer[0];
    imgJump = this.images.bluePlayer[1];
    const bluePlayer = new Player(
      this.context,
      this.canvas,
      imgIdle,
      imgJump,
      this.canvas.width / 5,
      "KeyA"
    );

    return bluePlayer;
  }

  moveBluePlayer() {
    if (!this.blueBlinking || Math.floor(Date.now() / frequency) % 2) {
      this.bluePlayer.move();
    }
  }

  setRedPlayer() {
    let imgIdle, imgJump;
    imgIdle = this.images.redPlayer[0];
    imgJump = this.images.redPlayer[1];
    const redPlayer = new Player(
      this.context,
      this.canvas,
      imgIdle,
      imgJump,
      (this.canvas.width * 4) / 5 - 120,
      "KeyL"
    );

    return redPlayer;
  }

  moveRedPlayer() {
    if (!this.redBlinking || Math.floor(Date.now() / frequency) % 2) {
      this.redPlayer.move();
    }
  }

  generateRedObstacle() {
    const X = this.canvas.width / 2 + this.canvas.width / 32;
    const Y = 200;

    const redObstacle = new Obstacle(
      this.context,
      this.canvas,
      X,
      Y,
      70,
      70,
      this.images.redObstacles
    );

    return redObstacle;
  }

  moveRedObstacle() {
    const DIRECTION = 1;

    this.redObstacle.handleFall(DIRECTION);
  }

  generateBlueObstacle() {
    const X = this.canvas.width / 2 - this.canvas.width / 14;
    const Y = 200;
    const BLUEOBSTACLE = new Obstacle(
      this.context,
      this.canvas,
      X,
      Y,
      70,
      70,
      this.images.blueObstacles
    );

    return BLUEOBSTACLE;
  }

  moveBlueObstacle() {
    const DIRECTION = -1;

    this.blueObstacle.handleFall(DIRECTION);
  }

  setLogPile() {
    const IMG = this.images.logPile;
    const X = this.canvas.width / 2 - this.canvas.width / 16;
    const Y = (this.canvas.height * 5) / 7;
    const WIDTH = this.canvas.width / 8;
    const HEIGHT = this.canvas.height / 4;

    this.context.drawImage(IMG, X, Y, WIDTH, HEIGHT);
  }

  setBackground() {
    const IMG = this.images.background;
    const X = 0;
    const Y = 0;
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;

    this.context.drawImage(IMG, X, Y, WIDTH, HEIGHT);
  }

  detectRedObstacleCollision() {
    if (this.redObstacle) {
      if (
        detectRectangularCollision(
          this.redObstacle,
          this.redPlayer,
          -50,
          0,
          0,
          0
        )
      ) {
        this.gameScoreBoard.increaseBlueScore();
        this.redBlinking = true;
        this.redObstacle.resetObstacle();
        // playAudio("./games/timberman/assets/audio/redHit.mp3");
      }
    }
  }

  detectBlueObstacleCollision() {
    if (this.blueObstacle) {
      if (
        detectRectangularCollision(
          this.blueObstacle,
          this.bluePlayer,
          0,
          0,
          -50,
          0
        )
      ) {
        this.gameScoreBoard.increaseRedScore();
        this.blueBlinking = true;
        this.blueObstacle.resetObstacle();
        // playAudio("./games/timberman/assets/audio/blueHit.mp3");
      }
    }
  }

  handleReplay() {
    super.handleReplay(this);
    console.log(this);
    this.gameRun = true;
  }
}
