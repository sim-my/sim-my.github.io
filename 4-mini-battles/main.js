import GameCard from "./core/js/components/game-card.js";
import Flames from "./games/flames/main.js";
import { gamesData } from "./data.js";
import { preloadImages } from "./core/js/helpers/utils.js";
import GameCardGrid from "./core/js/components/game-card-grid.js";
import Rocket from "./games/rocket/js/main.js";
import Timberman from "./games/timberman/js/main.js";

let rocketGameStart = false;
let timbermanGameStart = false;
let rocketGame, timbermanGame;
let gameCreated = false;

const canvas = document.querySelector("canvas");
const scoreboard = document.querySelector('.scoreboard');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');

const gameOver = document.querySelector(".game-over");
const winnerTeamImg = document.querySelector('.winner-team-img');
const winnerTagImg = document.querySelector('.winner-tag-img');
const replayButton = document.querySelector('.replay-button');
const rocketGameBtn = document.querySelector('.rocket-game');
const timbermanGameBtn = document.querySelector('.timberman-game');
const homeButton = document.querySelector('.home-button');

const ctx = canvas.getContext("2d");

canvas.height = innerHeight - 100;
canvas.width = innerWidth;



//Setting up local scoreboard of the game (wrapper)
scoreboard.style.height = 100 + 'px';
scoreboard.style.width = '100%';
scoreboard.style.backgroundColor = '#79508a';
scoreboard.style.display = 'flex';
scoreboard.style.justifyContent = 'space-around';
scoreboard.style.textAlign = 'center';
scoreboard.style.display = 'none';

//setting up local scoreboard of the game (red team)
red.style.height = scoreboard.style.height;
red.style.width = 200 + 'px';
red.style.backgroundColor = '#ff0000';
red.style.color = '#fff';
red.style.fontSize = '48px';
red.style.lineHeight = scoreboard.style.height;
red.innerHTML = 0;


//setting up local scoreboard for the game (blue team)
blue.style.height = scoreboard.style.height;
blue.style.width = 200 + 'px';
blue.style.backgroundColor = '#0000ff';
blue.style.color = '#fff';
blue.style.fontSize = '48px';
blue.style.lineHeight = scoreboard.style.height;
blue.innerHTML = 0;


//get home-page
const homePage = document.querySelector('.home-page');


const background = () => {};

// const flames = new Flames(canvas, gamesData[0]);
// flames.start();

const renderCard = () => {
  const gameCardGrid = new GameCardGrid(gamesData, canvas);
  gameCardGrid.draw();
};

rocketGameBtn.addEventListener('click', () => {rocketGameStart = true; gameCreated = false; createGame('rocket');});
timbermanGameBtn.addEventListener('click', () => {timbermanGameStart = true; gameCreated = false; createGame('timberman');});

homeButton.addEventListener('click', ()=> {rocketGameStart = false; timbermanGameStart = false; gameCreated = false;});

let games = ["flames", "goal", "rocket", "timberman"];

const createGame = (gameName) =>{
  if(gameName === 'rocket'){
    rocketGame = new Rocket('rocket', canvas, gamesData[2], red, blue, gameOver, winnerTeamImg, winnerTagImg, replayButton, homeButton, scoreboard, homePage, rocketGameStart);
    gameCreated = true;
  }
  else if(gameName === 'timberman'){
    timbermanGame = new Timberman('timberman', canvas, gamesData[2], red, blue, gameOver, winnerTeamImg, winnerTagImg, replayButton, homeButton, scoreboard, homePage, timbermanGameStart);
    gameCreated = true;
  }
  
}
const animate = () => {
ctx.clearRect(0,0, canvas.width, canvas.height)
  if(rocketGameStart && gameCreated){
    homePage.style.display = 'none';
    scoreboard.style.display = 'flex';
    rocketGame.start();
  } 

  if(timbermanGameStart && gameCreated){
    homePage.style.display = 'none';
    scoreboard.style.display = 'flex';
    timbermanGame.start();
  } 
  requestAnimationFrame(animate);
};

animate();
