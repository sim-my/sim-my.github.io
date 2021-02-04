import { increaseScore } from '../helpers/utils.js';

export default class GameScoreBoard {
  constructor() {
    this.scoreboard = document.querySelector('.scoreboard');
    this.red = document.querySelector('.red');
    this.blue = document.querySelector('.blue');
  }

  draw() {
    this.styles();
  }

  increaseRedScore() {
    increaseScore(this.red);
  }

  increaseBlueScore() {
    increaseScore(this.blue);
  }

  show() {
    this.scoreboard.style.display = 'flex';
  }

  hide() {
    this.scoreboard.style.display = 'none';
  }
  
  getRedScore() {
    return parseInt(this.red.innerHTML);
  }

  getBlueScore() {
    return parseInt(this.blue.innerHTML);
  }

  setRedScore(score) {
    return (this.red.innerHTML = score);
  }

  setBlueScore(score) {
    return (this.blue.innerHTML = score);
  }

  styles() {
    //Setting up local scoreboard of the game (wrapper)
    this.scoreboard.style.height = 100 + 'px';
    this.scoreboard.style.width = '100%';
    this.scoreboard.style.backgroundColor = '#79508a';
    this.scoreboard.style.justifyContent = 'space-around';
    this.scoreboard.style.textAlign = 'center';
    this.scoreboard.style.display = 'flex';

    //setting up local scoreboard of the game (red team)
    this.red.style.height = this.scoreboard.style.height;
    this.red.style.width = 200 + 'px';
    this.red.style.backgroundColor = '#ff0000';
    this.red.style.color = '#fff';
    this.red.style.fontSize = '48px';
    this.red.style.lineHeight = this.scoreboard.style.height;

    //setting up local scoreboard for the game (blue team)
    this.blue.style.height = this.scoreboard.style.height;
    this.blue.style.width = 200 + 'px';
    this.blue.style.backgroundColor = '#0000ff';
    this.blue.style.color = '#fff';
    this.blue.style.fontSize = '48px';
    this.blue.style.lineHeight = this.scoreboard.style.height;
  }
}
