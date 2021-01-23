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

const ctx = canvas.getContext("2d");

canvas.height = innerHeight - 100;
canvas.width = innerWidth;


scoreboard.style.height = (innerHeight - canvas.height) + 'px';
scoreboard.style.width = innerWidth + 'px';
scoreboard.style.backgroundColor = '#79508a';
scoreboard.style.display = 'flex';
scoreboard.style.justifyContent = 'space-around';
scoreboard.style.textAlign = 'center';

red.style.height = scoreboard.style.height;
red.style.width = innerWidth / 5 + 'px';
red.style.width = innerWidth;
red.style.backgroundColor = '#ff0000';
red.style.color = '#fff';
red.style.fontSize = '62px';
red.style.lineHeight = scoreboard.style.height;
red.innerHTML = 0;



blue.style.height = scoreboard.style.height;
blue.style.width = innerWidth / 5 + 'px';
blue.style.width = innerWidth;
blue.style.backgroundColor = '#0000ff';
blue.style.color = '#fff';
blue.style.fontSize = '62px';
blue.style.lineHeight = scoreboard.style.height;
blue.innerHTML = 0;


const background = () => {};

// const flames = new Flames(canvas, gamesData[0]);
// flames.start();

const renderCard = () => {
  const gameCardGrid = new GameCardGrid(gamesData, canvas);
  gameCardGrid.draw();
};


let games = ["flames", "goal", "rocket", "timberman"];

const rocketGame = new Rocket(canvas, gamesData[2], red, blue);
const animate = () => {
  rocketGame.start();
  requestAnimationFrame(animate);
};

animate();
