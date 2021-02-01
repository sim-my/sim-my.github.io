import Game from "../../../core/js/classes/game.js";
import Obstacle from "../js/classes/obstacle.js";
import Obstacles from "../js/classes/obstacles.js";
import Bullet from "../js/classes/bullet.js";
import Player from "../js/classes/player.js";
import { loadingAllImages } from "../../../core/js/helpers/utils.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";
import { playAudio } from "../../../core/js/helpers/audio.js";

export default class Rocket extends Game {
  constructor(
    game,
    canvas,
    context,
    gameData,
    gameScoreCard,
    gameEndScreen,
  ) {
    super(canvas, context, gameData, gameScoreCard, gameEndScreen);
    
    this.game = game;
    this.gameRun = true;

    this.obstacles;
  }

  start() {
    super.start();

    this.setBackground();
    this.updateRockets();
    this.setObstacles();
    this.updateRedBullet();
    this.updateBlueBullet();
    this.detectCollision(this.redBullet);
    this.detectCollision(this.blueBullet);
  }

  init() {
    super.init();

    this.images = loadingAllImages(this.gameData.assets);
    this.redRocket = this.createRedRocket();
    this.blueRocket = this.createBlueRocket();
    this.redBullet = this.createRedBullet();
    this.blueBullet = this.createBlueBullet();
  }

  setBackground() {
    this.context.drawImage(
      this.images.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  createRedRocket() {
    const y = this.canvas.height - 100;
    const redRocket = new Player(
      y,
      this.canvas,
      this.context,
      this.images["red-rocket"]
    );
    return redRocket;
  }

  createBlueRocket() {
    const y = 0;
    const blueRocket = new Player(
      y,
      this.canvas,
      this.context,
      this.images["blue-rocket"]
    );
    return blueRocket;
  }

  updateRockets() {
    this.redRocket.move();
    this.blueRocket.move();
  }

  setObstacles() {
    const obstaclesSrc = [
      this.images["red-obstacle"],
      this.images["blue-obstacle"],
    ];
    const count = 2;
    this.obstacles = new Obstacles(
      this.context,
      this.canvas,
      count,
      obstaclesSrc
    );
    this.obstacles.manage();
  }

  detectCollision(bullet){
    this.obstacles.detectCollision(bullet, 
      (x,y) => {
        this.gameScoreBoard.increaseRedScore();
        this.blastDisplay(x, y);
      }, 
      (x,y) =>{
        this.gameScoreBoard.increaseBlueScore();
        this.blastDisplay(x, y);
      });
  }

  createRedBullet() {
    const X = this.redRocket.x + this.redRocket.width / 2;
    const Y = this.canvas.height - this.redRocket.height;
    const redBullet = new Bullet(
      this.context,
      this.canvas,
      X,
      Y,
      "#ff0000",
      "bottom",
      'KeyA'
    );

    return redBullet;
  }

  createBlueBullet() {
    const X = this.blueRocket.x + this.blueRocket.width / 2;
    const Y = this.blueRocket.height;
    const blueBullet = new Bullet(
      this.context,
      this.canvas,
      X,
      Y,
      "#0000FF",
      "top",
      "KeyL"
    );
   
    return blueBullet;
  }

  updateRedBullet() {
    const X = this.redRocket.x + this.redRocket.width / 2;
    const Y = this.redRocket.y;
    this.redBullet.update(X, Y);
  }

  updateBlueBullet() {
    const X = this.blueRocket.x + this.blueRocket.width / 2;
    const Y = this.blueRocket.y + this.blueRocket.height
    this.blueBullet.update(X, Y);
  }

  blastDisplay(x, y) {
      this.context.drawImage(this.images.blast, x - 50, y, 200, 50);
    }  

   handleReplay() {
    super.handleReplay();
    this.gameRun = true;
  }

  clearGame() {
    super.clearGame();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.rocketX = 0;
    redBulletArray = [];
    blueBulletArray = [];
    obstacleArray = [];
    this.fireRedBullet = false;
    this.fireBlueBullet = false;
  }
}
