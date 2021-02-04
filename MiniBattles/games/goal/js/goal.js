import GoalPlayer from './classes/goal-player.js';
import Football from './classes/football.js';
import GoalPost from './classes/goalpost.js';

import Game from '../../../../core/js/classes/game.js';

import { FACE_DIRECTION } from '../../../../core/js/data.js';

import { playAudio } from '../../../../core/js/helpers/audio.js';

export default class Goal extends Game {
  constructor(
    game,
    canvas,
    context,
    assets,
    gameScoreBoard,
    gameEndScreen,
    gameInstructions
  ) {
    super(
      canvas,
      context,
      assets,
      gameScoreBoard,
      gameEndScreen,
      gameInstructions
    );
    this.game = game;
    this.football;
    this.redPlayer;
    this.bluePlayer;
    this.rightGoalPost;
    this.leftGoalPost;
    this.goalPostWidth = 100;
    this.goalPostHeight = 200;

    this.gameRunning;
  }

  start() {
    super.start();

    this.football.update(this.redPlayer, this.bluePlayer);

    this.redPlayer.update(this.bluePlayer, this.football);
    this.bluePlayer.update(this.redPlayer, this.football);

    this.rightGoalPost.draw();
    this.leftGoalPost.draw();

    this.checkRightPostCollison();
    this.checkLeftPostCollison();
  }

  init() {
    super.init();

    this.football = this.createFootBall();
    this.redPlayer = this.createRedPlayer();
    this.bluePlayer = this.createBluePlayer();
    this.rightGoalPost = this.createRightGoalPost();
    this.leftGoalPost = this.createLeftGoalPost();
  }

  checkRightPostCollison() {
    this.rightGoalPost.checkCollission(this.football, () => {
      this.gameScoreBoard.increaseRedScore();
      playAudio(this.assets.sounds.cheer);
      this.resetAllEntities();
    });
  }

  checkLeftPostCollison() {
    this.leftGoalPost.checkCollission(this.football, () => {
      this.gameScoreBoard.increaseBlueScore();
      playAudio(this.assets.sounds.cheer);
      this.resetAllEntities();
    });
  }

  createFootBall() {
    let footballWidth = 60;
    let footballHeight = 60;

    let x = this.canvas.width / 2;
    /**
     * The ball doesnt look exactly on the center, because of the image
     * The number changes how far (+) or close (-) the ball is from the center of canvas
     */
    let ballDistanceYFromCenter = -10;
    let y = this.canvas.height / 2;

    const football = new Football(
      x,
      y,
      footballWidth,
      footballHeight,
      0,
      this.assets.images.football,
      this.canvas,
      this.context,
      this.assets.sounds
    );

    return football;
  }

  createRedPlayer() {
    let redPlayerX = this.canvas.width - 270;

    return this.createPlayer(
      redPlayerX,
      this.assets.images.bluePlayer,
      FACE_DIRECTION.LEFT,
      'KeyL'
    );
  }

  createBluePlayer() {
    let bluePlayerX = 270;

    return this.createPlayer(
      bluePlayerX,
      this.assets.images.redPlayer,
      FACE_DIRECTION.RIGHT,
      'KeyA'
    );
  }

  createPlayer(x, image, faceDirection, moveKey) {
    let playerWidth = 54;
    let playerHeight = 95;
    const radians = 0;

    /**
     * The player isn't centerally located on the Y axis, because of the uniniformity of the image
     * The variable {playerOffSetY} acts as an offset,  (+) for pusing down or  (-) for pulling up
     */
    let playerOffsetY = -50;
    let playerY = this.canvas.height / 2 + playerOffsetY;

    const player = new GoalPlayer(
      x,
      playerY,
      playerWidth,
      playerHeight,
      radians,
      image,
      this.canvas,
      this.context,
      faceDirection,
      moveKey
    );
    return player;
  }

  createRightGoalPost() {
    let x = this.canvas.width - 75 - this.goalPostWidth;
    let y = this.canvas.height / 2 - 120;

    return this.createGoalPost(x, y);
  }

  createLeftGoalPost() {
    let x = 75;
    let y = this.canvas.height / 2 - 120;

    return this.createGoalPost(x, y);
  }

  createGoalPost(x, y) {
    let width = this.goalPostWidth;
    let height = this.goalPostHeight;

    const goalPost = new GoalPost(
      this.canvas,
      this.context,
      this.assets.images.post,
      x,
      y,
      width,
      height
    );

    return goalPost;
  }

  resetAllEntities() {
    this.redPlayer.reset();
    this.bluePlayer.reset();
    this.football.reset();
  }

  resetGame() {
    super.resetGame();
    this.resetAllEntities();
  }
}
