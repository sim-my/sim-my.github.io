import GameCard from "./core/js/components/game-card.js";
import Flames from "./games/flames/main.js";
import { gamesData } from "./data.js";
import { preloadImages } from "./core/js/helpers/utils.js";
import GameCardGrid from "./core/js/components/game-card-grid.js";
import Rocket from "./games/rocket/js/main.js";

const canvas = document.querySelector("canvas");
const scoreboard = document.querySelector('.scoreboard');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');

const gameOver = document.querySelector(".game-over");
const winnerTeamImg = document.querySelector('.winner-team-img');
const winnerTagImg = document.querySelector('.winner-tag-img');
const replayButton = document.querySelector('.replay-button');
 

const ctx = canvas.getContext("2d");

canvas.height = innerHeight - 100;
canvas.width = innerWidth;



//Setting up local scoreboard of the game (wrapper)
scoreboard.style.height = (innerHeight - canvas.height) + 'px';
scoreboard.style.width = '100%';
scoreboard.style.backgroundColor = '#79508a';
scoreboard.style.display = 'flex';
scoreboard.style.justifyContent = 'space-around';
scoreboard.style.textAlign = 'center';

//setting up local scoreboard of the game (red team)
red.style.height = scoreboard.style.height;
red.style.width = innerWidth / 5 + 'px';
red.style.width = innerWidth;
red.style.backgroundColor = '#ff0000';
red.style.color = '#fff';
red.style.fontSize = '48px';
red.style.lineHeight = scoreboard.style.height;
red.innerHTML = 0;


//setting up local scoreboard for the game (blue team)
blue.style.height = scoreboard.style.height;
blue.style.width = innerWidth / 5 + 'px';
blue.style.width = innerWidth;
blue.style.backgroundColor = '#0000ff';
blue.style.color = '#fff';
blue.style.fontSize = '48px';
blue.style.lineHeight = scoreboard.style.height;
blue.innerHTML = 0;


const background = () => {};

// const flames = new Flames(canvas, gamesData[0]);
// flames.start();

const renderCard = () => {
  const gameCardGrid = new GameCardGrid(gamesData, canvas);
  gameCardGrid.draw();
};

replayButton.addEventListener('click', ()=>{

});


let games = ["flames", "goal", "rocket", "timberman"];

const rocketGame = new Rocket('rocket',canvas, gamesData[2], red, blue, gameOver, winnerTeamImg, winnerTagImg, replayButton);
const animate = () => {
  rocketGame.start();
  requestAnimationFrame(animate);
};

animate();
