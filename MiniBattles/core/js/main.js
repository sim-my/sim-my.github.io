import Goal from "../../games/goal/js/goal.js";
import Rocket from "../../games/rocket/js/rocket.js";
import Timberman from "../../games/timberman/js/timberman.js";

import GameEnd from "../../core/js/components/game-end.js";
import GameScoreBoard from "../../core/js/components/game-scoreboard.js";
import GameInstructions from "../../core/js/components/game-instructions.js";

import { playAudio } from "../js/helpers/audio.js";
import { getRandomNumber, getCombinedAssets } from "../js/helpers/utils.js";

import { gamesData, commonSounds, GAME_STATE, instructions } from "../data.js";

let currentGame = null;
let currentGameInstance = null;

let rocketGame, goalGame, timbermanGame;

const ROCKET_GAME = "ROCKET_GAME";
const TIMBER_MAN_GAME = "TIMBER_MAN_GAME";
const GOAL_GAME = "GOAL_GAME";

const gameOrder = [GOAL_GAME, TIMBER_MAN_GAME, ROCKET_GAME];

const canvas = document.querySelector("canvas");

const rocketGameBtn = document.querySelector(".rocket-game");
const timbermanGameBtn = document.querySelector(".timberman-game");
const goalGameBtn = document.querySelector(".goal-game");

const randomizeGameButton = document.querySelector(".random-button");

const ctx = canvas.getContext("2d");

canvas.height = innerHeight - 100;
canvas.width = innerWidth;

// Get home-page
const homePage = document.querySelector(".home-page");

rocketGameBtn.addEventListener("click", () => {
  createGame(ROCKET_GAME);
});

timbermanGameBtn.addEventListener("click", () => {
  createGame(TIMBER_MAN_GAME);
});

goalGameBtn.addEventListener("click", () => {
  createGame(GOAL_GAME);
});

randomizeGameButton.addEventListener("click", () => {
  let randomGame = getRandomGame(gameOrder);
  createGame(randomGame);
});

const getNextGameName = (currentGame, gameNextArray) => {
  let currentGameIndex = gameNextArray.indexOf(currentGame);

  let nextGame = gameNextArray[(currentGameIndex + 1) % gameNextArray.length];

  return nextGame;
};

const getRandomGame = (gameArray) => {
  let randomIndex = getRandomNumber(0, gameArray.length - 1);
  return gameArray[randomIndex];
};

let rocketGameAssetsArray = gamesData[0].assets;
let timbermanGameAssetsArray = gamesData[1].assets;
let goalGameAssetsArray = gamesData[2].assets;

let rocketGameAssets = getCombinedAssets(rocketGameAssetsArray);
let timbermanGameAssets = getCombinedAssets(timbermanGameAssetsArray);
let goalGameAssets = getCombinedAssets(goalGameAssetsArray);

/**
 * This function, intantiates the right game and sets it to currentGameInstance, which the animateGame function later executes
 *
 * @param {String} gameName Name of the game
 */
const createGame = (gameName) => {
  playAudio(commonSounds.game_start);
  currentGame = gameName;
  switch (gameName) {
    case ROCKET_GAME:
      let rocketGameScoreBoard = new GameScoreBoard();
      let rocketGameInstructions = new GameInstructions(instructions.rocket);
      let rocketGameEndScreen = new GameEnd(canvas, ctx, rocketGameScoreBoard);
      
      rocketGame = new Rocket(
        "rocket",
        canvas,
        ctx,
        rocketGameAssets,
        rocketGameScoreBoard,
        rocketGameEndScreen,
        rocketGameInstructions,
        homePage
      );
      rocketGame.init();

      // End Screen Buttons
      // Home Button
      rocketGameEndScreen.onHomeButton(() => {
        onHomeButtonPress();
      });

      // Next Button
      rocketGameEndScreen.onNextButton(() => {
        onNextButtonpress(ROCKET_GAME, gameOrder);
      });

      currentGameInstance = rocketGame;

      break;

    case TIMBER_MAN_GAME:
      let timbermanGameScoreBoard = new GameScoreBoard();
      let timbermanGameEndScreen = new GameEnd(
        canvas,
        ctx,
        timbermanGameScoreBoard
      );
      let timbermanGameInstuctions = new GameInstructions(instructions.timberman);

      timbermanGame = new Timberman(
        "timberman",
        canvas,
        ctx,
        timbermanGameAssets,
        timbermanGameScoreBoard,
        timbermanGameEndScreen,
        timbermanGameInstuctions,
        homePage
      );
      timbermanGame.init();

      // End Screen Buttons
      
      // Home Button
      timbermanGameEndScreen.onHomeButton(() => {
        onHomeButtonPress();
      });

      // Next Button
      timbermanGameEndScreen.onNextButton(() => {
        onNextButtonpress(TIMBER_MAN_GAME, gameOrder);
      });

      currentGameInstance = timbermanGame;
      break;

    case GOAL_GAME:
      let goalGameScoreCard = new GameScoreBoard();
      let goalGameEndScreen = new GameEnd(canvas, ctx, goalGameScoreCard);
      let goalGameInstructions = new GameInstructions(instructions.goal);

      goalGame = new Goal(
        "goal",
        canvas,
        ctx,
        goalGameAssets,
        goalGameScoreCard,
        goalGameEndScreen,
        goalGameInstructions
      );
      goalGame.init();

      // End Screen Buttons
      // Home Button
      goalGameEndScreen.onHomeButton(() => {
        onHomeButtonPress();
      });

      // Next Button
      goalGameEndScreen.onNextButton(() => {
        onNextButtonpress(GOAL_GAME, gameOrder);
      });

      currentGameInstance = goalGame;

      break;

    default:
  }
};

// Game End Buttons
const onHomeButtonPress = () => {
  currentGameInstance = null;
  currentGame = null;
};

const onNextButtonpress = (currentGame, gameOrder) => {
  let nextGame = getNextGameName(currentGame, gameOrder);
  currentGame = nextGame;
  createGame(nextGame);
};

const animateGame = () => {
  if (
    currentGameInstance != null &&
    currentGameInstance.gameState === GAME_STATE.RUNNING
  ) {
    currentGameInstance.start();
  }

  requestAnimationFrame(animateGame);
};

animateGame();
