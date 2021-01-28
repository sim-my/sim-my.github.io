import Game from "../../../core/js/classes/game.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";
import playAudio from "../../../core/js/helpers/audio.js";
import { preloadImages } from "../../../core/js/helpers/utils.js";
import Player from "./classes/player.js";
import Obstacle from "./classes/obstacle.js";

let frequency = 200;
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
    this.blueBlinking = false;
    this.redBlinking = false;
    this.blueObstacleY = 200;
    this.redObstacleX = this.canvas.width / 2 + this.canvas.width / 32;
    this.finalPoint = 5;
    this.scoreBoard = scoreBoard;
    this.blueObstacleX = this.canvas.width / 2 - this.canvas.width / 14;
    this.jumpRed = false;
    this.jumpBlue = false;
    this.blueOnTop = false;
    this.redOnTop = false;
    this.redScore = 0;
    this.blueScore = 0;
    this.homePage = homePage;
    this.timbermanGameStart = timbermanGameStart;
    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyL") {
        this.jumpRed = true;
        playAudio('./games/timberman/assets/audio/redJump.mp3');
      }
    });

    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyA") {
        this.jumpBlue = true;
        playAudio('./games/timberman/assets/audio/blueJump.mp3');
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
    if(this.gameRun){
      this.init();
    }   
  }

  init(){
    this.handleSpeed();
    this.generateRedObstacle();
    this.moveRedObstacle();
    this.generateBlueObstacle();
    this.moveBlueObstacle();
    this.detectRedObstacleCollision();
    this.detectBlueObstacleCollision();
    this.setRedScore();
    this.setBlueScore();
  }


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
    let imgSrc;
    if (!this.jumpBlue) {
      imgSrc = bluePlayerJumpSrc[0];
    } else {
      imgSrc = bluePlayerJumpSrc[1];
    }
    if (this.jumpBlue) {
      this.bluePlayerY -= 10;
    }
    this.bluePlayer = new Player(this.context, imgSrc, this.canvas.width / 5, this.bluePlayerY, 120, 200);
    if (!this.blueBlinking || Math.floor(Date.now() / frequency) % 2) {
      this.bluePlayer.draw();
    }
  }

  setRedPlayer() {
    let imgSrc;
    if (!this.jumpRed) {
      imgSrc = redPlayerJumpSrc[0];
    } else {
      imgSrc = redPlayerJumpSrc[1];
    }
    if (this.jumpRed) {
      this.redPlayerY -= 10;
    }

    this.redPlayer = new Player(this.context, imgSrc, (this.canvas.width * 4) / 5 - 120, this.redPlayerY, 120, 200);
    if (!this.redBlinking || Math.floor(Date.now() / frequency) % 2) {
      this.redPlayer.draw();
    }
  }

  generateRedObstacle() {
    if (redObstacles.length === 0) {
      let imgSrc = `./games/timberman/assets/images/${redObstacleSrc[redObstacleIndex]}`;
      let redObstacle = new Obstacle(this.context, imgSrc, this.redObstacleX, this.redObstacleY, 70, 70);
      redObstacles.push(redObstacle);
    }
  }

  moveRedObstacle() {   
    let imageSrc = `./games/timberman/assets/images/${redObstacleSrc[redObstacleIndex]}`; 
    let redObstacle = redObstacles[0];
    if (!this.redObstacleCollide) {
      redObstacle.move(0, 10);
    }
    if (
      redObstacle.y >= (this.canvas.height * 3) / 4 &&
      redObstacle.y < this.canvas.height - 100
    ) {
      this.redObstacleCollide = true;
      this.redObstacleSlide = true;
      this.redBlinking = false;
      this.slideRedObstacle(redObstacle);
    }
    if (redObstacle.y >= this.canvas.height - 100) {
      this.redObstacleSlide = false;
      if (redObstacleFrame % 5 === 0) {
        redObstacleIndex = (redObstacleFrame / 5) % redObstacleSrc.length;
      }
      redObstacle.move(8, 0, imageSrc);
      redObstacleFrame++;
    }
    

    if (redObstacle.x > this.canvas.width) {
      redObstacle.x = this.canvas.width / 2 + this.canvas.width / 32;
      redObstacle.y = 200;
      redObstacles.pop();
      this.redObstacleCollide = false;
    }
  }

  generateBlueObstacle() {
    if (blueObstacles.length === 0) {      
      let imgSrc = `./games/timberman/assets/images/${blueObstacleSrc[blueObstacleIndex]}`;
      let blueObstacle = new Obstacle(this.context, imgSrc, this.blueObstacleX, this.blueObstacleY, 70, 70);
      blueObstacles.push(blueObstacle);
    }
    
  }

  moveBlueObstacle(){
    let imageSrc = `./games/timberman/assets/images/${redObstacleSrc[redObstacleIndex]}`; 
    let blueObstacle = blueObstacles[0];
    if (!this.blueObstacleCollide) {
      blueObstacle.move(0, 15);
    }
    if (
      blueObstacle.y >= (this.canvas.height * 3) / 4 &&
      blueObstacle.y <= this.canvas.height - 100
    ) {
      blueObstacle.src = `./games/timberman/assets/images/obstacle-1.png`;
      this.blueObstacleCollide = true;
      this.blueObstacleSlide = true;
      this.blueBlinking = false;
      this.slideBlueObstacle(blueObstacle);
    }
    if (blueObstacle.y > this.canvas.height - 100) {
      blueObstacleFrame++;
      this.blueObstacleSlide = false;
      if (blueObstacleFrame % 5 === 0) {
        blueObstacleIndex = (blueObstacleFrame / 5) % blueObstacleSrc.length;
      }
      imageSrc = `./games/timberman/assets/images/${blueObstacleSrc[blueObstacleIndex]}`;
      blueObstacle.move(-8, 0, imageSrc);
    }


    if (blueObstacle.x < -70) {
      blueObstacle.x = this.canvas.width / 2 - this.canvas.width / 14;
      blueObstacle.y = 200;
      blueObstacles.pop();
      this.blueObstacleCollide = false;
    }
  }

  slideBlueObstacle(blueObstacle) {
    if (this.blueObstacleSlide) {
      blueObstacle.move(-5, 5);
    }
  }

  slideRedObstacle(redObstacle) {
    if (this.redObstacleSlide) {
      redObstacle.move(5, 5);
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

  detectRedObstacleCollision(){
    if (redObstacles.length > 0) {
      let redObstacle = redObstacles[0];
        if (detectRectangularCollision(redObstacle, this.redPlayer,-50, 0, 0, 0)) {  
          this.redScore ++;
          this.redBlinking = true;        
          redObstacle.x = this.canvas.width / 2 + this.canvas.width / 32;
          redObstacle.y = 200;
          redObstacles.pop();
          this.redObstacleCollide = false;
          playAudio('./games/timberman/assets/audio/redHit.mp3');          
        }
    }
  }

  detectBlueObstacleCollision(){
    if (blueObstacles.length > 0) {
      let blueObstacle = blueObstacles[0];
        if (detectRectangularCollision(blueObstacle, this.bluePlayer, 0, 0, -50, 0)) {
          this.blueScore++;
          this.blueBlinking = true;
          blueObstacle.x = this.canvas.width / 2 - this.canvas.width / 14;
          blueObstacle.y = 200;
          blueObstacles.pop();
          this.blueObstacleCollide = false;
          playAudio('./games/timberman/assets/audio/blueHit.mp3');
      } 
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
    if(this.game === 'timberman'){
      this.gameRun = true;
      this.clearGame();
      this.gameOver.style.display = 'none';      
    }    
  }

  handleHome(){
    this.clearGame();  
    this.gameOver.style.display = 'none';  
    this.scoreBoard.style.display = 'none';
    this.homePage.style.display = 'block';
  }

  clearGame(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.redScore = 0;
    this.blueScore = 0;
  }
}


