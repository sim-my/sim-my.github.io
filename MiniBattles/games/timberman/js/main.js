import Game from "../../../core/js/classes/game.js";
import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";

import { playAudio } from "../../../core/js/helpers/audio.js";

import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";

export default class Timberman extends Game {
  constructor(
    game,
    canvas,
    context,
    assets,
    gameScoreBoard,
    gameEndScreen,
    gameInstructions
  ) {
    super(
      canvas,
      context,
      assets,
      gameScoreBoard,
      gameEndScreen,
      gameInstructions
    );
    this.game = game;

    this.stopBlinkTime = 2000;

    this.bluePlayer = this.setBluePlayer();
    this.redPlayer = this.setRedPlayer();
    this.redObstacle = this.generateRedObstacle();
    this.blueObstacle = this.generateBlueObstacle();
  }

  start() {
    super.start();
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
    imgIdle = this.assets.images.blue_idle;
    imgJump = this.assets.images.blue_jump;
    const bluePlayer = new Player(
      this.context,
      this.canvas,
      imgIdle,
      imgJump,
      this.canvas.width * 4/ 5,
      "KeyL"
    );

    return bluePlayer;
  }

  setRedPlayer() {
    let imgIdle, imgJump;
    imgIdle = this.assets.images.red_idle;
    imgJump = this.assets.images.red_jump;
    const redPlayer = new Player(
      this.context,
      this.canvas,
      imgIdle,
      imgJump,
      (this.canvas.width ) / 5 - 120,
      "KeyA"
    );

    return redPlayer;
  }

  moveRedPlayer() {
    this.redPlayer.move();
  }

  moveBluePlayer() {
    this.bluePlayer.move();
  }

  generateRedObstacle() {
    const X = this.canvas.width / 2 - this.canvas.width / 14;
    const Y = this.canvas.height * 29 / 60;

    const redObstacle = new Obstacle(
      this.canvas,
      this.context,
      this.assets.images.obstacle,
      X,
      Y,
      this.canvas.height / 10,
      this.canvas.height / 10,
      -1
    );

    return redObstacle;
  }

  moveRedObstacle() {
    this.redObstacle.handleFall();
  }

  moveBlueObstacle() {
    this.blueObstacle.handleFall();
  }

  generateBlueObstacle() {
    const X = this.canvas.width / 2 + this.canvas.width / 32;
    const Y = this.canvas.height * 29 / 60;
    const BLUEOBSTACLE = new Obstacle(      
      this.canvas,
      this.context,
      this.assets.images.obstacle,
      X,
      Y,
      this.canvas.height / 10,
      this.canvas.height / 10,
      1
    );

    return BLUEOBSTACLE;
  }

  setLogPile() {
    const IMG = this.assets.images.log_pile;
    const X = this.canvas.width / 2 - this.canvas.width / 16;
    const Y = (this.canvas.height * 5) / 7;
    const WIDTH = this.canvas.width / 8;
    const HEIGHT = this.canvas.height / 4;

    this.context.drawImage(IMG, X, Y, WIDTH, HEIGHT);
  }

  // setBackground() {
  //   const IMG = this.images.background;
  //   const X = 0;
  //   const Y = 0;
  //   const WIDTH = this.canvas.width;
  //   const HEIGHT = this.canvas.height;

  //   this.context.drawImage(IMG, X, Y, WIDTH, HEIGHT);
  // }

  detectRedObstacleCollision() {
    if (this.redObstacle) {
      if (
        detectRectangularCollision(
          this.redObstacle,
          this.redPlayer,
          0,
          0,
          -50,
          0
        )
      ) {
        this.gameScoreBoard.increaseBlueScore();
        this.redPlayer.blink();

        // Stop blinking after stopBlinkTime
        setTimeout(() => {
          this.redPlayer.stopBlink();
        }, this.stopBlinkTime);
        
        this.redObstacle.resetObstacle();
        playAudio(this.assets.sounds.red_hit);
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
        this.bluePlayer.blink();

        // Stop blinking after stopBlinkTime
        setTimeout(() => {
          this.bluePlayer.stopBlink();
        }, this.stopBlinkTime);

        this.blueObstacle.resetObstacle();
        playAudio(this.assets.sounds.blue_hit);
      }
    }
  }

  resetGame() {
    super.resetGame();

    this.blueObstacle.resetObstacle();
    this.redObstacle.resetObstacle();
  }
}
