import { playAudio } from "../helpers/audio.js";
import { preloadImages } from "../helpers/utils.js";
import {GAME_STATE} from "../../../data.js";

export default class Game {
  constructor(canvas, context, gameData, gameScoreBoard, gameEndScreen) {
    this.canvas = canvas;
    this.context = context;
    this.gameData = gameData;
    this.startAudioUrl = "../core/assets/sounds/game-start.mp3";
    this.gameScoreBoard = gameScoreBoard;
    this.gameEndScreen = gameEndScreen;

    this.homePage = document.querySelector(".home-page");

    this.finalScore = 5;

    this.gameState = GAME_STATE.RUNNING;
  }

  start() {
    this.setBackground();
    
    this.checkBlueScore();
    this.checkRedScore();
  }

  init() {
    let preloadedImages = preloadImages(this.gameData.assets);
    this.assets = preloadedImages;

    /** Show Game Score Board */
    this.gameScoreBoard.draw();

    /** Game End Butons */
    this.gameEndScreen.onHomeButton(this.handleHome.bind(this));

    this.gameEndScreen.onReplayButton(this.handleReplay.bind(this));

    this.gameEndScreen.onNextButton(this.handleNext.bind(this));

    this.gameEndScreen.onAnyButtonClick(this.handleAnyButtonClick.bind(this));
  }

  setBackground() {
    this.context.drawImage(
      this.assets.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  increaseRedScore() {
    this.gameScoreBoard.increaseRedScore();
  }

  increaseBlueScore() {
    this.gameScoreBoard.increaseBlueScore();
  }

  checkRedScore() {
    let redScore = this.gameScoreBoard.getRedScore();

    if (redScore === this.finalScore) {
      
      this.gameState = GAME_STATE.STOPPED;

      this.gameEndScreen.showGameEnd(
        "./core/assets/images/red-winner.png",
        "./core/assets/images/red.png"
      );
    }
  }

  checkBlueScore() {
    let blueScore = this.gameScoreBoard.getBlueScore();

    if (blueScore === this.finalPoint) {
      
      this.gameState = GAME_STATE.STOPPED;

      this.gameEndScreen.showGameEnd(
        "./core/assets/images/blue-winner.png",
        "./core/assets/images/blue.png"
      );
    }
  }

  handleReplay() {
    console.log("Handle Replay home");
    this.clearGame();
    this.gameEndScreen.hide();
  }

  handleHome() {
    this.clearGame();
    this.gameEndScreen.hide();
    this.gameScoreBoard.hide();
    this.homePage.style.display = "block";
  }

  handleNext() {
    this.clearGame();
    this.gameEndScreen.hide();
    this.gameScoreBoard.hide();
  }

  handleAnyButtonClick(){
    this.gameState = GAME_STATE.RUNNING;
  }

  clearGame() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameScoreBoard.setBlueScore(0);
    this.gameScoreBoard.setRedScore(0);
  }
}
