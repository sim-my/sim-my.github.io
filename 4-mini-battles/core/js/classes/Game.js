import playAudio from "../helpers/audio.js";
import { preloadImages } from "../helpers/utils.js";

export default class Game {
  constructor(canvas, gameData) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.gameData = gameData;
    this.startAudioUrl = "../core/assets/sounds/game-start.mp3";
  }

  start() {
    preloadImages(this.gameData.assets, () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log("Loaded and Start");
    });
  }
}
