import GameCard from "./game-card.js";

export default class GameCardGrid {

    constructor(gamesData, canvas){
        this.gamesData = gamesData;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

  draw() {
    let cardWidth = 150;
    let cardHeight = 150;
    let firstCardX = this.canvas.width / 4 - cardWidth / 4;
    let cardY = this.canvas.height / 3;
    let cardMargin = 50;
    const cardCount = 4;
    
    for (let i = 0; i < cardCount; i++) {
      let cardImageSrc = this.gamesData[i].cardImageSrc;
      const card = new GameCard(
        `${cardImageSrc}`,
        firstCardX + i * (cardWidth + cardMargin),
        cardY,
        cardWidth,
        cardHeight,
        this.ctx
      );
      card.update();
    }
  }
}
