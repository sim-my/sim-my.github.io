import Game from "../../core/js/classes/game.js";
import { FACE_DIRECTION } from "../../data.js";
import Football from "./js/football.js";
import GoalPost from "./js/goalpost.js";
import Player from "./js/player.js";
import {playAudio} from "../../core/js/helpers/audio.js";

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
    super(canvas, context, assets, gameScoreBoard, gameEndScreen, gameInstructions);
    this.game = game;
    this.football;
    this.player1;
    this.player2;
    this.rightGoalPost;
    this.leftGoalPost;
    this.goalPostWidth = 100;
    this.goalPostHeight = 200;

    this.gameRunning;
  }

  start() {
    super.start();

    this.football.update(this.player1, this.player2);

    this.player1.update(this.player2, this.football);
    this.player2.update(this.player1, this.football);

    this.rightGoalPost.draw();
    this.leftGoalPost.draw();

    this.checkRightPostCollison();
    this.checkLeftPostCollison();
  }

  init() {
    super.init();

    this.football = this.createFootBall(this.assets.images.football);
    this.player1 = this.createPlayer1(this.assets.images.player1);
    this.player2 = this.createPlayer2(this.assets.images.player2);
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

  createFootBall(footballImage) {
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
      footballImage,
      this.canvas,
      this.context
    );

    return football;
  }

  createPlayer1(player1Image) {
    let player1X = 270;
    let player1Y = this.canvas.height / 2 - 50;
    let radians = 0;

    return this.createPlayer(
      "Player1",
      player1X,
      radians,
      player1Image,
      FACE_DIRECTION.RIGHT,
      "KeyA"
    );
  }

  createPlayer2(player2Image) {
    let player2X = this.canvas.width - 270;
    let player2Y = this.canvas.height / 2 - 50;
    let radians = -3.14;

    return this.createPlayer(
      "Player2",
      player2X,
      radians,
      player2Image,
      FACE_DIRECTION.LEFT,
      "KeyL"
    );
  }

  createPlayer(name, x, radians, image, faceDirection, moveKey ) {
    let playerWidth = 54;
    let playerHeight = 95;

    /**
     * The player isn't centerally located on the Y axis, because of the uniniformity of the image
     * The variable {playerOffSetY} acts as an offset,  (+) for pusing down or  (-) for pulling up
     */
    let playerOffsetY = -50;
    let playerY = this.canvas.height / 2 + playerOffsetY;

    const player = new Player(
      name,
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

  resetAllEntities(){
    this.player1.reset();
    this.player2.reset();
    this.football.reset();
  }

  resetGame(){
    super.resetGame();
    this.resetAllEntities();
  }
}
