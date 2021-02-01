import { getRandomNumber } from '../../../../core/js/helpers/utils.js';
import Obstacle from './obstacle.js';

const obstacleArray = [];

export default class Obstacles {    
    constructor(context, canvas, count, obstacleImgArray){      
        this.context = context;
        this.canvas = canvas;
        this.count = count;        
        this.obstacleImgArray = obstacleImgArray;

        this.minGap = 350;
        this.maxGap = 650;
        this.obstacleWidth = 50;
        this.obstacleHeight = 50;
        this.obstacleX = this.canvas.width;        
        this.obstacleY= this.canvas.height / 2 - this.obstacleHeight / 2; 
    }  

    create(){
      const len = this.obstacleImgArray.length;
      const gap = getRandomNumber(this.minGap, this.maxGap);
      for(let i = 0; i < this.count; i ++){
        const key = i % len;
        const X = this.obstacleX + i * gap;
        const obstacleImg = this.obstacleImgArray[key];
        const obstacle = new Obstacle(this.canvas, this.context,obstacleImg, X, this.obstacleY, this.obstacleWidth, this.obstacleHeight, key);
        obstacleArray.push(obstacle);
      }
    }

    move(){
      for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.move();
        if (obstacle.x < - this.obstacleWidth) {
          obstacleArray.shift();
        }
      }
    } 
    
    manage(){
      if (obstacleArray.length < this.count) {
        this.create();
      }
      this.move();
    }

    detectCollision(bullet, redScoreCallback, blueScoreCallback){
      if(bullet){
        obstacleArray.forEach(obstacle => {
          obstacle.checkCollission(bullet, () => {
            obstacleArray.splice(obstacle, 1);
            if(obstacle.key === 0){
              redScoreCallback(obstacle.x, obstacle.y);
            }
            else{
              blueScoreCallback(obstacle.x, obstacle.y);
            }
          });         
        })
      }
    }
}

