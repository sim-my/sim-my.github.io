import {commonSounds} from '../data.js';

import { playAudio } from '../helpers/audio.js';
import { increaseScore } from '../helpers/utils.js';

export default class GameEnd {
  constructor(gameScoreBoard) {
    this.homeEndButton = document.querySelector('.home-button');
    this.replayButton = document.querySelector('.replay-button');
    this.nextButton = document.querySelector('.next-button');
    this.winnerTeamImg = document.querySelector('.winner-team-img');
    this.winnerTagImg = document.querySelector('.winner-tag-img');
    this.gameOverDiv = document.querySelector('.game-over');
    this.homePage = document.querySelector('.home-page');

    this.redGameScore = document.querySelector('.red-score-game-over');
    this.blueGameScore = document.querySelector('.blue-score-game-over');

    this.redTotalScore = document.querySelector('.red-total-score');
    this.blueTotalScore = document.querySelector('.blue-total-score');

    this.gameEndButtons = document.querySelectorAll('.game-end-button');

    this.gameScoreBoard = gameScoreBoard;
  }

  showGameEnd(winnertagImg, winnerTeamImg) {
    playAudio(commonSounds.game_over);
    this.show();
    this.winnerTeamImg.setAttribute('src', winnerTeamImg);
    this.winnerTagImg.setAttribute('src', winnertagImg);
  }

  hide() {
    return (this.gameOverDiv.style.display = 'none');
  }

  show() {
    return (this.gameOverDiv.style.display = 'block');
  }

  redWinsGameEnd() {
    this.increaseRedGameScore();
    this.increaseRedTotalGameScore();
    this.showGameEnd(
      './core/assets/images/red-winner.png',
      './core/assets/images/red.png'
    );
  }

  blueWinsGameEnd() {
    this.increaseBlueGameScore();
    this.increaseBlueTotalGameScore();
    this.showGameEnd(
      './core/assets/images/blue-winner.png',
      './core/assets/images/blue.png'
    );
  }

  increaseRedGameScore() {
    increaseScore(this.redGameScore);
  }

  increaseBlueGameScore() {
    increaseScore(this.blueGameScore);
  }

  increaseRedTotalGameScore() {
    increaseScore(this.redTotalScore);
  }

  increaseBlueTotalGameScore() {
    increaseScore(this.blueTotalScore);
  }

  onNextButton(nextClickFunction) {
    this.nextButton.addEventListener('click', () => nextClickFunction());
  }

  onReplayButton(replayButtonFunction) {
    this.replayButton.addEventListener('click', () => replayButtonFunction());
  }

  onHomeButton(homeButtonFunction) {
    this.homeEndButton.addEventListener('click', () => homeButtonFunction());
  }

}
