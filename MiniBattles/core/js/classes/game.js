
import { GAME_STATE } from "../../../data.js";

export default class Game {
  constructor(
    canvas,
    context,
    assets,
    gameScoreBoard,
    gameEndScreen,
    gameInstructions
  ) {
    this.canvas = canvas;
    this.context = context;
    this.assets = assets;
    this.startAudioUrl = "../core/assets/sounds/game-start.mp3";
    this.gameScoreBoard = gameScoreBoard;
    this.gameEndScreen = gameEndScreen;
    this.gameInstructions = gameInstructions;

    this.assets = assets;

    this.homePage = document.querySelector(".home-page");

    this.finalScore = 5;

    this.gameState = GAME_STATE.STOPPED;
  }

  start() {
    this.checkBlueScore();
    this.setBackground();
    this.checkRedScore();
  }

  init() {
    this.setBackground();
    this.homePage.style.display = "none";

    // Show Game Score Board
    this.gameScoreBoard.draw();

    // Game End Butons
    this.gameEndScreen.onHomeButton(this.handleHome.bind(this));

    this.gameEndScreen.onReplayButton(this.handleReplay.bind(this));

    this.gameEndScreen.onNextButton(this.handleNext.bind(this));

    this.gameEndScreen.onAnyButtonClick(this.handleAnyButtonClick.bind(this));

    // Show instructions
    this.gameInstructions.show();

    setTimeout(() => {
      this.gameState = GAME_STATE.RUNNING;
      this.gameInstructions.hide();
    }, this.gameInstructions.instructionShowTime);
  }

  setBackground() {
    this.context.drawImage(
      this.assets.images.background,
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

      this.gameEndScreen.redWinsGameEnd();
    }
  }

  checkBlueScore() {
    let blueScore = this.gameScoreBoard.getBlueScore();

    if (blueScore === this.finalScore) {
      this.gameState = GAME_STATE.STOPPED;

      this.gameEndScreen.blueWinsGameEnd();
    }
  }

  handleReplay() {
    this.resetGame();
    this.gameEndScreen.hide();
  }

  handleHome() {
    this.resetGame();
    this.gameEndScreen.hide();
    this.gameScoreBoard.hide();
    this.homePage.style.display = "block";
  }

  handleNext() {
    this.resetGame();
    this.gameEndScreen.hide();
    this.gameScoreBoard.hide();
  }

  handleAnyButtonClick() {
    this.gameState = GAME_STATE.RUNNING;
  }

  resetGame() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameScoreBoard.setBlueScore(0);
    this.gameScoreBoard.setRedScore(0);
  }
}
