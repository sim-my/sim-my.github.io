import GameCard from "./core/js/components/game-card.js";
import Flames from "./games/flames/main.js";
import { gamesData } from "./data.js";
import { preloadImages } from "./core/js/helpers/utils.js";
import GameCardGrid from "./core/js/components/game-card-grid.js";
import Rocket from "./games/rocket/js/main.js";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

const background = () => {};

const flames = new Flames(canvas, gamesData[0]);
flames.start();

const renderCard = () => {
  const gameCardGrid = new GameCardGrid(gamesData, canvas);
  gameCardGrid.draw();
};

console.log("Games data");

let games = ["flames", "goal", "rocket", "timberman"];

const rocketGame = new Rocket(canvas, gamesData[2]);
const animate = () => {
  rocketGame.start();
  requestAnimationFrame(animate);
};

animate();
