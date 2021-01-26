import Game from "../../../core/js/classes/game.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";
import  playAudio from '../../../core/js/helpers/audio.js';

let frame = 0;
const redPlayerJumpSrc = ['./games/timberman/assets/images/red-idle.png','./games/timberman/assets/images/red-jump-2.png'];
const bluePlayerJumpSrc = ['./games/timberman/assets/images/blue-idle.png','./games/timberman/assets/images/blue-jump-2.png'];
export default class Timberman extends Game {
  constructor(game,canvas, gameData, red, blue, gameOver, winnerTeamImg, winnerTagImg, replayButton, homeButton, scoreBoard, homePage, timbermanGameStart) {
    super(canvas, gameData);
    this.game = game;
    this.gameRun = true;
    this.red = red;
    this.redPlayer;
    this.bluePlayer;
    this.blue = blue;
    this.gameOver = gameOver;
    this.redPlayerY = this.canvas.height * 2/3;
    this.bluePlayerY = this.canvas.height * 2/3
    this.winnerTeamImg = winnerTeamImg;
    this.winnerTagImg = winnerTagImg;
    this.replayButton = replayButton;
    this.homeButton = homeButton;
    this.obstacleY = 200;
    this.redObstacleX =  this.canvas.width / 2 - this.canvas.width / 14;
    this.finalPoint = 5;
    this.scoreBoard = scoreBoard;
    this.blueObstacleX = this.canvas.width / 2 + this.canvas.width / 32;    
    this.jumpRed = false;
    this.jumpBlue = false;
    this.blueOnTop = false;
    this.obstacleCollide = false;
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

    this.replayButton.addEventListener('click', ()=>this.handleReplay());
    this.homeButton.addEventListener('click', ()=>this.handleHome());
  }

  start() {
    frame ++;
    this.setBackground();
    this.setLogPile();
    this.setBluePlayer();
    this.setRedPlayer();
    this.handleSpeed();
    this.generateObstacle();
  }

  init(){       

  }

  handleSpeed(){
    if(this.redPlayerY <= this.canvas.height * 2/3 - 200){
      this.redOnTop = true;
    }

    if(this.bluePlayerY <= this.canvas.height * 2/3 - 200){
      this.blueOnTop = true;
    }

    if(this.redOnTop){
      this.redPlayerY+=10;
      this.jumpRed = false;
    }

    if(this.blueOnTop){
      this.bluePlayerY+=10;
      this.jumpBlue = false;
    }

    if(this.redPlayerY >= this.canvas.height * 2/3){
      this.redOnTop = false;
    }

    if(this.bluePlayerY >= this.canvas.height * 2/3){
      this.blueOnTop = false;
    }
  }

  setBluePlayer(){
    this.bluePlayer= new Image();
    if(!this.jumpBlue){
      this.bluePlayer.src = bluePlayerJumpSrc[0];   
    }
    else{
      this.bluePlayer.src = bluePlayerJumpSrc[1];
    }     
    if(this.jumpBlue){
      this.bluePlayerY -= 10;
    }
    this.context.drawImage(this.bluePlayer, this.canvas.width / 5, this.bluePlayerY, 120, 200);
  }

  setRedPlayer(){
    this.redPlayer = new Image();
    if(!this.jumpRed){
      this.redPlayer.src = redPlayerJumpSrc[0];   
    }
    else{
      this.redPlayer.src = redPlayerJumpSrc[1];
    }     
    if(this.jumpRed){
      this.redPlayerY -= 10;
    }
    this.context.drawImage(this.redPlayer, this.canvas.width * 4/ 5 - 120, this.redPlayerY, 120, 200);
  }

  generateObstacle(){
    const redObstacle = new Image();
    redObstacle.src = './games/timberman/assets/images/obstacle.png';
    this.context.drawImage(redObstacle,this.redObstacleX, this.obstacleY, 70, 70);
    
    const blueObstacle = new Image();
    blueObstacle.src = './games/timberman/assets/images/obstacle.png';
    this.context.drawImage(blueObstacle, this.blueObstacleX, this.obstacleY, 70, 70);
    if(!this.obstacleCollide) {
      this.obstacleY +=5;
    } 
    if(this.obstacleY >=this.canvas.height * 3/4){
      this.obstacleCollide = true;
      this.slideBlueObstacle();
    }
  
  }

  slideBlueObstacle(){
      this.blueObstacleX ++;
      this.obstacleY ++;       
  }

  setLogPile(){
    const logImg = new Image();
    logImg.src = './games/timberman/assets/images/log-pile.png';
    this.context.drawImage(logImg, this.canvas.width / 2 - this.canvas.width / 16, this.canvas.height * 5/7, this.canvas.width / 8, this.canvas.height / 4)
  }

  setBackground(){
    const bgImg = new Image();
    bgImg.src = "./games/timberman/assets/images/bg.jpg";

    this.context.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
  }
}

