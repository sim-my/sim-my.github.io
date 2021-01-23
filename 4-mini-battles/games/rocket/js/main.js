import Game from "../../../core/js/classes/game.js";
import Obstacle from "../js/classes/obstacle.js";
import Bullet from "../js/classes/bullet.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";
import  playAudio from '../../../core/js/helpers/audio.js';

let obstacleArray = [];
let redBulletArray = [];
let blueBulletArray = [];
const obstaclesSrc = [
  "./games/rocket/assets/images/red-obstacle.png",
  "./games/rocket/assets/images/blue-obstacle.png",
];
export default class Rocket extends Game {
  constructor(game,canvas, gameData, red, blue, gameOver, winnerTeamImg, winnerTagImg, replayButton) {
    super(canvas, gameData);
    this.game = game;
    this.gameRun = true;
    this.red = red;
    this.blue = blue;
    this.redRocket;
    this.fireBlueBullet = false;
    this.fireRedBullet = false;
    this.obstacleX = this.canvas.width;
    this.redHit = false;
    this.blueHit = false;
    this.redScore = 0;
    this.blueScore = 0;
    this.blueRocket;
    this.blastX;
    this.blastY;
    this.obstacleCount = 4;
    this.rocketX = 0;
    this.rocketSpeed = 5;
    this.rocketHeight = 100;
    this.rocketWidth = 50;
    this.obstacleWidth = 50;
    this.obstacleHeight = 50;
    this.gameOver = gameOver;
    this.winnerTeamImg = winnerTeamImg;
    this.winnerTagImg = winnerTagImg;
    this.replayButton = replayButton;
    this.finalPoint = 5;
    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyL") {
        this.fireBlueBullet = true;
      }
    });

    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyA") {
        this.fireRedBullet = true;
      }
    });

    this.replayButton.addEventListener('click', ()=>this.handleReplay());
  }

  start() {
    super.start();
    this.setBackground();
    this.setRedRocket();
    this.setBlueRocket();
    if(this.gameRun){
      this.init();
    }       
  }

  init(){       
    this.moveRocket();
    this.manageObstacles();
    this.manageRedBullet();
    this.manageBlueBullet();
    this.detectBlueBulletCollision();
    this.detectRedBulletCollision();
    this.blastRedObstacle();
    this.blastBlueObstacle();
    this.setRedScore();
    this.setBlueScore();
  }

  createObstacles() {
    let gap = Math.random() * (650 - 350) + 350;
    for (let i = 0; i < this.obstacleCount; i++) {
      const obstacleSrc = obstaclesSrc[i % obstaclesSrc.length];
      const obstacle = new Obstacle(
        this.context,
        i % obstaclesSrc.length,
        obstacleSrc,
        this.obstacleX + i * gap,
        this.canvas.height / 2 - this.obstacleHeight / 2,
        this.obstacleWidth,
        this.obstacleHeight
      );
      obstacleArray.push(obstacle);
    }
  }

  moveObstacles() {
    for (let i = 0; i < obstacleArray.length; i++) {
      let obstacle = obstacleArray[i];
      obstacle.draw();
      if (obstacle.x < -this.obstacleWidth) {
        obstacleArray.shift();
      }
    }
  }

  manageObstacles() {
    if (obstacleArray.length < this.obstacleCount) {
      this.createObstacles();
    }
    this.moveObstacles();
  }

  setRedRocket() {
    this.redRocket = new Image();
    this.redRocket.src = "./games/rocket/assets/images/red-rocket.png";
    this.context.drawImage(
      this.redRocket,
      this.rocketX,
      this.canvas.height - this.rocketHeight,
      this.rocketWidth,
      this.rocketHeight
    );

  }

  moveRocket(){
    this.rocketX += this.rocketSpeed;
    if (this.rocketX > this.canvas.width - this.rocketWidth) {
      this.rocketX = 0;
    }
  }

  setBlueRocket() {
    this.blueRocket = new Image();
    this.blueRocket.src = "./games/rocket/assets/images/blue-rocket.png";
    this.context.drawImage(
      this.blueRocket,
      this.rocketX,
      0,
      this.rocketWidth,
      this.rocketHeight
    );
  }

  setBackground() {
    const bgImg = new Image();
    bgImg.src = "./games/rocket/assets/images/bg.png";

    let ptrn = this.context.createPattern(bgImg, "repeat");
    this.context.fillStyle = ptrn;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createRedBullet() {
    const redBullet = new Bullet(
      this.context,
      this.rocketX + this.rocketWidth / 2,
      this.canvas.height - this.rocketHeight,
      "#ff0000",
      this.obstacleWidth,
      this.obstacleHeight,
      "bottom"
    );
    redBulletArray.push(redBullet);
  }

  createBlueBullet() {
    const blueBullet = new Bullet(
      this.context,
      this.rocketX + this.rocketWidth / 2,
      this.rocketHeight,
      "#0000FF",
      this.obstacleWidth,
      this.obstacleHeight,
      "top"
    );
    blueBulletArray.push(blueBullet);
  }

  moveRedBullet() {
    redBulletArray.forEach((redBullet) => {
      redBullet.move();
      if (redBullet.y <= this.canvas.height / 2 - this.obstacleHeight) {
        redBulletArray.shift();
        this.fireRedBullet = false;
      }
    });
  }

  moveBlueBullet() {
    blueBulletArray.forEach((blueBullet) => {
      blueBullet.move();
      if (blueBullet.y >= this.canvas.height / 2 + this.obstacleHeight) {
        blueBulletArray.shift();
        this.fireBlueBullet = false;
      }
    });
  }

  manageRedBullet() {
    if (redBulletArray.length === 0 && this.fireRedBullet) {
      this.createRedBullet();
      playAudio('./games/rocket/assets/audio/red-shoot.mp3');
    }
    if (this.fireRedBullet) {
      this.moveRedBullet();
    }
  }

  manageBlueBullet() {
    if (blueBulletArray.length === 0 && this.fireBlueBullet) {
      this.createBlueBullet();
      playAudio('./games/rocket/assets/audio/blue-shoot.mp3');
    }
    if (this.fireBlueBullet) {
      
      this.moveBlueBullet();
    }
  }

  detectBlueBulletCollision() {
    if (blueBulletArray.length > 0) {
      let blueBullet = blueBulletArray[0];
      obstacleArray.forEach((obstacle) => {
        if (detectRectangularCollision(blueBullet, obstacle)) {
          //Red obstacle Collision detection
          playAudio('./games/rocket/assets/audio/poof.mp3');
          if (obstacle.key === 0) {
            this.redScore ++;
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
            this.blastRed = true;
            this.blastX = obstacle.x;
            this.blastY = obstacle.y;
          }
          //Blue obstacle Collision detection
          else if (obstacle.key === 1) {
            this.blueScore ++;
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
            this.blastBlue = true;
            this.blastX = obstacle.x;
            this.blastY = obstacle.y;
          }
        }
      });
    }
  }
  detectRedBulletCollision() {
    if (redBulletArray.length > 0) {
      let redBullet = redBulletArray[0];
      obstacleArray.forEach((obstacle) => {
        if (detectRectangularCollision(redBullet, obstacle)) {
          //Red obstacle Collision detection
          playAudio('./games/rocket/assets/audio/poof.mp3');
          if (obstacle.key === 0) {
            this.redScore ++;
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
            this.blastRed = true;
            this.blastX = obstacle.x;
            this.blastY = obstacle.y;
          }
          //Blue obstacle Collision detection
          else if (obstacle.key === 1) {
            this.blueScore ++;
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
            this.blastBlue = true;
            this.blastX = obstacle.x;
            this.blastY = obstacle.y;
          }
        }
      });
    }
  }

  blastRedObstacle(){
    if(this.blastRed){
      const blast = new Image();
      blast.src = './games/rocket/assets/images/blast.png';
      this.context.drawImage(blast, this.blastX - this.obstacleWidth, this.blastY, 200, 50);  
      
      setTimeout(()=> {this.blastRed = false}, 300);
    }
  }

  blastBlueObstacle(){
    if(this.blastBlue){
      const blast = new Image();
      blast.src = './games/rocket/assets/images/blast.png';
      this.context.drawImage(blast, this.blastX - this.obstacleWidth, this.blastY, 200, 50);       
      setTimeout(()=> this.blastBlue = false, 300);
    }
  }
  
  setRedScore(){
    this.red.innerHTML = this.redScore;
    if(this.redScore === this.finalPoint){
      this.endGame('./core/assets/images/red-winner.png','./core/assets/images/red.png')
    }
  }

  setBlueScore(){
    this.blue.innerHTML = this.blueScore;
    if(this.blueScore === this.finalPoint){
      this.endGame('./core/assets/images/blue-winner.png','./core/assets/images/blue.png')
    }
  }

    
  endGame(winnertagImg, winnerTeamImg){
      this.gameRun = false;
      playAudio('./core/assets/sounds/game-over.mp3');
      this.gameOver.style.display = 'block';
      this.winnerTeamImg.setAttribute('src', winnerTeamImg);
      this.winnerTagImg.setAttribute('src', winnertagImg);
  }  
  
  handleReplay(){
    if(this.game === 'rocket'){
      this.gameRun = true;
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.rocketX = 0;
      this.redScore = 0;
      this.blueScore = 0;
      redBulletArray = [];
      blueBulletArray = [];
      obstacleArray = [];
      this.fireRedBullet = false;
      this.fireBlueBullet = false;
      this.gameOver.style.display = 'none';      
    }
  }
}

