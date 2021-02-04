import Obstacle from "./classes/obstacle.js";
import TimbermanPlayer from "./classes/timberman-player.js";

import Game from "../../../../../core/js/classes/game.js";

import { FACE_DIRECTION } from "../../../../../core/js/data.js";

import { playAudio } from "../../../../../core/js/helpers/audio.js";

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

    this.redPlayer;
    this.bluePlayer;
    this.redObstacle;
    this.blueObstacle;
  }

  start() {
    super.start();

    this.setLogPile();

    this.bluePlayer.move();
    this.redPlayer.move();

    this.redObstacle.handleFall();
    this.blueObstacle.handleFall();

    this.detectRedObstacleCollision();
    this.detectBlueObstacleCollision();
  }

  init() {
    super.init();

    this.bluePlayer = this.createBluePlayer();
    this.redPlayer = this.createRedPlayer();

    this.redObstacle = this.createRedObstacle();
    this.blueObstacle = this.createBlueObstacle();
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
      (this.canvas.width * 4) / 5,
      'KeyL'
    );

    return bluePlayer;
  }

  createBluePlayer() {
    let imgIdle = this.assets.images.blue_idle;
    let imgJump = this.assets.images.blue_jump;
    let x = (this.canvas.width * 4) / 5;
    let key = 'KeyL';

    return this.createPlayer(x, imgIdle, imgJump, key);
  }

  createRedPlayer() {
    let imgIdle = this.assets.images.red_idle;
    let imgJump = this.assets.images.red_jump;
    let x = this.canvas.width / 5 - 120;
    let key = 'KeyA';

    return this.createPlayer(x, imgIdle, imgJump, key);
  }

  createPlayer(x, imgIdle, imgJump, key) {
    let width = this.canvas.width / 12;
    let height = this.canvas.height / 3;
    let y = this.canvas.height - (height * 5) / 4;

    let player = new TimbermanPlayer(
      x,
      y,
      width,
      height,
      imgIdle,
      imgJump,
      this.canvas,
      this.context,
      key
    );

    return player;
  }

  createRedObstacle() {
    let x = this.canvas.width / 2 - this.canvas.width / 14;
    let direction = FACE_DIRECTION.LEFT;

    return this.createObstacle(x, direction);
  }

  createBlueObstacle() {
    let x = this.canvas.width / 2 + this.canvas.width / 32;
    let direction = FACE_DIRECTION.RIGHT;

    return this.createObstacle(x, direction);
  }

  createObstacle(x, direction) {
    let y = 200;

    let obstacle = new Obstacle(
      this.canvas,
      this.context,
      this.assets.images.obstacle,
      x,
      y,
      this.canvas.height / 10,
      this.canvas.height / 10,
      direction
    );

    return obstacle;
  }

  setLogPile() {
    let img = this.assets.images.log_pile;
    let x = this.canvas.width / 2 - this.canvas.width / 16;
    let y = (this.canvas.height * 5) / 7;
    let width = this.canvas.width / 8;
    let height = this.canvas.height / 4;

    this.context.drawImage(img, x, y, width, height);
  }

  detectBlueObstacleCollision() {
    let obstacle = this.blueObstacle;
    let player = this.bluePlayer;
    let d1X = -75;
    let d2X = 0;

    this.detectObstacleCollision(obstacle, player, d1X, d2X);
  }

  detectRedObstacleCollision() {
    let obstacle = this.redObstacle;
    let player = this.redPlayer;
    let d1X = 0;
    let d2X = -25;
    this.detectObstacleCollision(obstacle, player, d1X, d2X);
  }

  detectObstacleCollision(obstacle, player, d1X, d2X) {
    obstacle.checkCollission(
      player,
      () => {
        player.blink();
        // Stop blinking after stopBlinkTime
        if(player === this.redPlayer){
          this.gameScoreBoard.increaseBlueScore();
        }
        else{
          this.gameScoreBoard.increaseRedScore();
        }
        setTimeout(() => {
          player.stopBlink();
        }, this.stopBlinkTime);

        obstacle.resetObstacle();
        playAudio(this.assets.sounds.hit);
      },
      d1X,
      0,
      d2X,
      0
    );
  }

  resetGame() {
    super.resetGame();

    this.blueObstacle.resetObstacle();
    this.redObstacle.resetObstacle();
  }
}
