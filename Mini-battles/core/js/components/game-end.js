import { playAudio } from "../helpers/audio.js";

export default class GameEnd {
  constructor(gameScoreBoard) {
    this.homeEndButton = document.querySelector(".home-button");
    this.replayButton = document.querySelector(".replay-button");
    this.nextButton = document.querySelector(".next-button");
    this.winnerTeamImg = document.querySelector(".winner-team-img");
    this.winnerTagImg = document.querySelector(".winner-tag-img");
    this.gameOverDiv = document.querySelector(".game-over");
    this.homePage = document.querySelector(".home-page");

    this.gameEndButtons = document.querySelectorAll(".game-end-button");

    this.gameScoreBoard = gameScoreBoard;
  }

  showGameEnd(winnertagImg, winnerTeamImg) {
    // playAudio("./core/assets/sounds/game-over.mp3");
    this.show();
    this.winnerTeamImg.setAttribute("src", winnerTeamImg);
    this.winnerTagImg.setAttribute("src", winnertagImg);
  }

  hide() {
    return (this.gameOverDiv.style.display = "none");
  }

  show() {
    return (this.gameOverDiv.style.display = "block");
  }

  redWinsGameEnd() {
    this.showGameEnd(
      "./core/assets/images/red-winner.png",
      "./core/assets/images/red.png"
    );
  }

  blueWinsGameEnd() {
    this.showGameEnd(
      "./core/assets/images/blue-winner.png",
      "./core/assets/images/blue.png"
    );
  }

  onNextButton(nextClickFunction) {
    this.nextButton.addEventListener("click", () => nextClickFunction());
  }

  onReplayButton(replayButtonFunction) {
    this.replayButton.addEventListener("click", () => replayButtonFunction());
  }

  onHomeButton(homeButtonFunction) {
    this.homeEndButton.addEventListener("click", () => homeButtonFunction());
  }

  onAnyButtonClick(anyButtonClickFunction) {
    this.gameEndButtons.forEach((elem) =>
      elem.addEventListener("click", anyButtonClickFunction)
    );
  }
}
