import Game from "../../../core/js/classes/game.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";
import playAudio from "../../../core/js/helpers/audio.js";
import { preloadImages } from "../../../core/js/helpers/utils.js";

let blueObstacleFrame = 0;
let blueObstacleIndex = 0;
let redObstacleFrame = 0;
let redObstacleIndex = 0;
const redObstacles = [];
const blueObstacles = [];
const redPlayerJumpSrc = [
  "./games/timberman/assets/images/red-idle.png",
  "./games/timberman/assets/images/red-jump-2.png",
];

const bluePlayerJumpSrc = [
  "./games/timberman/assets/images/blue-idle.png",
  "./games/timberman/assets/images/blue-jump-2.png",
];
const redObstacleSrc = [
  "obstacle-1.png",
  "obstacle-2.png",
  "obstacle-3.png",
  "obstacle-4.png",
  "obstacle-5.png",
  "obstacle-6.png",
  "obstacle-7.png",
  "obstacle-8.png",
];

const blueObstacleSrc = [
  "obstacle-1.png",
  "obstacle-8.png",
  "obstacle-7.png",
  "obstacle-6.png",
  "obstacle-5.png",
  "obstacle-4.png",
  "obstacle-3.png",
  "obstacle-2.png",
];
export default class Timberman extends Game {
  constructor(
    game,
    canvas,
    gameData,
    red,
    blue,
    gameOver,
    winnerTeamImg,
    winnerTagImg,
    replayButton,
    homeButton,
    scoreBoard,
    homePage,
    timbermanGameStart
  ) {
    super(canvas, gameData);
    this.game = game;
    this.gameRun = true;
    this.red = red;
    this.redPlayer;
    this.bluePlayer;
    this.blue = blue;
    this.gameOver = gameOver;
    this.blueObstacleCollide = false;
    this.blueObstacleSlide = false;
    this.redObstacleSlide = false;
    this.redObstacleCollide = false;
    this.redPlayerY = (this.canvas.height * 2) / 3;
    this.bluePlayerY = (this.canvas.height * 2) / 3;
    this.winnerTeamImg = winnerTeamImg;
    this.winnerTagImg = winnerTagImg;
    this.replayButton = replayButton;
    this.homeButton = homeButton;
    this.redObstacleY = 200;
    this.blueObstacleY = 200;
    this.redObstacleX = this.canvas.width / 2 + this.canvas.width / 32;
    this.finalPoint = 5;
    this.scoreBoard = scoreBoard;
    this.blueObstacleX = this.canvas.width / 2 - this.canvas.width / 14;
    this.jumpRed = false;
    this.jumpBlue = false;
    this.blueOnTop = false;
    this.redOnTop = false;
    this.homePage = homePage;
    this.timbermanGameStart = timbermanGameStart;
    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyL") {
        this.jumpRed = true;
      }
    });

    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyA") {
        this.jumpBlue = true;
      }
    });

    this.replayButton.addEventListener("click", () => this.handleReplay());
    this.homeButton.addEventListener("click", () => this.handleHome());
  }

  start() {
    this.setBackground();
    this.setLogPile();
    this.setBluePlayer();
    this.setRedPlayer();
    this.handleSpeed();
    this.generateRedObstacle();
    this.moveRedObstacle();
    this.generateBlueObstacle();
    this.moveBlueObstacle();
  }

  init() {}

  handleSpeed() {
    if (this.redPlayerY <= (this.canvas.height * 2) / 3 - 200) {
      this.redOnTop = true;
    }

    if (this.bluePlayerY <= (this.canvas.height * 2) / 3 - 200) {
      this.blueOnTop = true;
    }

    if (this.redOnTop) {
      this.redPlayerY += 10;
      this.jumpRed = false;
    }

    if (this.blueOnTop) {
      this.bluePlayerY += 10;
      this.jumpBlue = false;
    }

    if (this.redPlayerY >= (this.canvas.height * 2) / 3) {
      this.redOnTop = false;
    }

    if (this.bluePlayerY >= (this.canvas.height * 2) / 3) {
      this.blueOnTop = false;
    }
  }

  setBluePlayer() {
    this.bluePlayer = new Image();
    if (!this.jumpBlue) {
      this.bluePlayer.src = bluePlayerJumpSrc[0];
    } else {
      this.bluePlayer.src = bluePlayerJumpSrc[1];
    }
    if (this.jumpBlue) {
      this.bluePlayerY -= 10;
    }
    this.context.drawImage(
      this.bluePlayer,
      this.canvas.width / 5,
      this.bluePlayerY,
      120,
      200
    );
  }

  setRedPlayer() {
    this.redPlayer = new Image();
    if (!this.jumpRed) {
      this.redPlayer.src = redPlayerJumpSrc[0];
    } else {
      this.redPlayer.src = redPlayerJumpSrc[1];
    }
    if (this.jumpRed) {
      this.redPlayerY -= 10;
    }
    this.context.drawImage(
      this.redPlayer,
      (this.canvas.width * 4) / 5 - 120,
      this.redPlayerY,
      120,
      200
    );
  }

  generateRedObstacle() {
    if (redObstacles.length === 0) {
      let redObstacle = new Image();
      redObstacles.push(redObstacle);
    }
  }

  moveRedObstacle() {
    let redObstacle = redObstacles[0];
    if (!this.redObstacleCollide) {
      this.redObstacleY += 10;
    }
    if (
      this.redObstacleY >= (this.canvas.height * 3) / 4 &&
      this.redObstacleY < this.canvas.height - 100
    ) {
      this.redObstacleCollide = true;
      this.redObstacleSlide = true;
      this.slideRedObstacle();
    }
    if (this.redObstacleY >= this.canvas.height - 100) {
      this.redObstacleSlide = false;
      if (redObstacleFrame % 5 === 0) {
        redObstacleIndex = (redObstacleFrame / 5) % redObstacleSrc.length;
      }
      this.redObstacleX += 5;
      redObstacleFrame++;
    }
    redObstacle.src = `./games/timberman/assets/images/${redObstacleSrc[redObstacleIndex]}`;
    this.context.drawImage(
      redObstacle,
      this.redObstacleX,
      this.redObstacleY,
      70,
      70
    );

    if (this.redObstacleX > this.canvas.width) {
      this.redObstacleX = this.canvas.width / 2 + this.canvas.width / 32;
      this.redObstacleY = 200;
      redObstacles.pop();
      this.redObstacleCollide = false;
    }
  }

  generateBlueObstacle() {
    if (blueObstacles.length === 0) {
      const blueObstacle = new Image();
      blueObstacles.push(blueObstacle);
    }
    
  }

  moveBlueObstacle(){
    let blueObstacle = blueObstacles[0];
    if (!this.blueObstacleCollide) {
      blueObstacle.src = `./games/timberman/assets/images/obstacle-1.png`;
      this.blueObstacleY += 15;
    }
    if (
      this.blueObstacleY >= (this.canvas.height * 3) / 4 &&
      this.blueObstacleY <= this.canvas.height - 100
    ) {
      blueObstacle.src = `./games/timberman/assets/images/obstacle-1.png`;
      this.blueObstacleCollide = true;
      this.blueObstacleSlide = true;
      this.slideBlueObstacle();
    }
    if (this.blueObstacleY > this.canvas.height - 100) {
      blueObstacleFrame++;
      this.blueObstacleSlide = false;
      if (blueObstacleFrame % 5 === 0) {
        blueObstacleIndex = (blueObstacleFrame / 5) % blueObstacleSrc.length;
      }
      blueObstacle.src = `./games/timberman/assets/images/${blueObstacleSrc[blueObstacleIndex]}`;
      this.blueObstacleX -= 5;
    }
    this.context.drawImage(
      blueObstacle,
      this.blueObstacleX,
      this.blueObstacleY,
      70,
      70
    );

    if (this.blueObstacleX < -70) {
      this.blueObstacleX = this.canvas.width / 2 - this.canvas.width / 14;
      this.blueObstacleY = 200;
      blueObstacles.pop();
      this.blueObstacleCollide = false;
    }
  }

  slideBlueObstacle() {
    if (this.blueObstacleSlide) {
      this.blueObstacleX -= 5;
      this.blueObstacleY += 5;
    }
  }

  slideRedObstacle() {
    if (this.redObstacleSlide) {
      this.redObstacleX += 5;
      this.redObstacleY += 5;
    }
  }

  setLogPile() {
    const logImg = new Image();
    logImg.src = "./games/timberman/assets/images/log-pile.png";
    this.context.drawImage(
      logImg,
      this.canvas.width / 2 - this.canvas.width / 16,
      (this.canvas.height * 5) / 7,
      this.canvas.width / 8,
      this.canvas.height / 4
    );
  }

  setBackground() {
    const bgImg = new Image();
    bgImg.src = "./games/timberman/assets/images/bg.jpg";
    this.context.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
  }
}
