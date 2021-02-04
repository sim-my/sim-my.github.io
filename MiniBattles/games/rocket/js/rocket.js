import Bullet from './classes/bullet.js';
import RocketPlayer from './classes/rocket-player.js';
import Obstacles from './classes/obstacles.js';

import Game from '../../../core/js/classes/game.js';

export default class Rocket extends Game {
  constructor(
    game,
    canvas,
    context,
    assets,
    gameScoreCard,
    gameEndScreen,
    gameInstructions
  ) {
    super(
      canvas,
      context,
      assets,
      gameScoreCard,
      gameEndScreen,
      gameInstructions
    );

    this.game = game;
    this.gameRun = true;

    this.obstacles;
  }

  start() {
    super.start();

    this.redRocket.move();
    this.blueRocket.move();

    this.setObstacles();

    this.updateBullet(this.redBullet, this.redRocket);
    this.updateBullet(this.blueBullet, this.blueRocket);

    this.detectCollision(this.redBullet);
    this.detectCollision(this.blueBullet);
  }

  init() {
    super.init();

    this.redRocket = this.createRedRocket();
    this.blueRocket = this.createBlueRocket();

    this.redBullet = this.createRedBullet();
    this.blueBullet = this.createBlueBullet();
  }

  createRedRocket() {
    let y = this.canvas.height - 100;
    let image = this.assets.images.red_rocket;

    return this.createRocket(y, image);
  }

  createBlueRocket() {
    let y = 0;
    let image = this.assets.images.blue_rocket;

    return this.createRocket(y, image);
  }

  createRocket(y, image) {
    let width = 50;
    let height = 100;

    let rocket = new RocketPlayer(
      0,
      y,
      width,
      height,
      image,
      this.canvas,
      this.context
    );

    return rocket;
  }

  setObstacles() {
    let obstaclesSrc = [
      this.assets.images.red_obstacle,
      this.assets.images.blue_obstacle,
    ];
    let count = 2;
    this.obstacles = new Obstacles(
      this.context,
      this.canvas,
      count,
      obstaclesSrc,
      this.assets.sounds
    );
    this.obstacles.manage();
  }

  detectCollision(bullet) {
    this.obstacles.detectCollision(
      bullet,
      (x, y) => {
        this.gameScoreBoard.increaseRedScore();
        this.blastDisplay(x, y);
      },
      (x, y) => {
        this.gameScoreBoard.increaseBlueScore();
        this.blastDisplay(x, y);
      }
    );
  }

  createRedBullet() {
    let y = this.canvas.height - this.redRocket.height;
    let color = 'red';
    let rocketPos = 'bottom';
    let key = 'KeyA';

    return this.createBullet(this.redRocket, y, color, rocketPos, key);
  }

  createBlueBullet() {
    let y = this.blueRocket.height;
    let color = 'blue';
    let rocketPos = 'top';
    let key = 'KeyL';

    return this.createBullet(this.blueRocket, y, color, rocketPos, key);
  }

  createBullet(rocket, y, color, rocketPos, key) {
    let x = rocket.x + rocket.width / 2;

    let bullet = new Bullet(
      this.context,
      this.canvas,
      x,
      y,
      color,
      rocketPos,
      key
    );

    return bullet;
  }

  updateBullet(bullet, rocket) {
    let x = rocket.x + rocket.width / 2;
    let y;
    if (bullet.rocketPosition == 'top') {
      y = rocket.height;
    } else {
      y = this.canvas.height - rocket.height;
    }

    bullet.update(x, y);
  }

  blastDisplay(x, y) {
    this.context.drawImage(this.assets.images.blast, x - 50, y, 200, 50);
  }

  handleReplay() {
    super.handleReplay();
    this.gameRun = true;
  }

  resetGame() {
    super.resetGame();
    this.obstacles = [];
    this.fireRedBullet = false;
    this.fireBlueBullet = false;
  }
}
