import Game from "../../../core/js/classes/game.js";
import Obstacle from "../js/classes/obstacle.js";
import Bullet from "../js/classes/bullet.js";
import { detectRectangularCollision } from "../../../core/js/helpers/utils.js";

const obstacleArray = [];
const redBulletArray = [];
const blueBulletArray = [];
const obstaclesSrc = [
  "./games/rocket/assets/red-obstacle.png",
  "./games/rocket/assets/blue-obstacle.png",
];
export default class Rocket extends Game {
  constructor(canvas, gameData) {
    super(canvas, gameData);
    this.redRocket;
    this.fireBlueBullet = false;
    this.fireRedBullet = false;
    this.obstacleX = this.canvas.width;
    this.blueRocket;
    this.obstacleCount = 3;
    this.rocketX = 0;
    this.rocketSpeed = 2;
    this.rocketHeight = 100;
    this.rocketWidth = 50;
    this.obstacleWidth = 50;
    this.obstacleHeight = 50;
    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyL") {
        this.fireBlueBullet = true;
      }
    });

    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyA") {
        this.fireRedBullet = true;
      }
    });
  }

  start() {
    super.start();
    this.setBackground();
    this.setRedRocket();
    this.setBlueRocket();
    this.manageObstacles();
    this.manageRedBullet();
    this.manageBlueBullet();
    this.detectBlueBulletCollision();
    this.detectRedBulletCollision();
  }

  createObstacles() {
    let gap = Math.random() * (650 - 350) + 350;
    for (let i = 0; i < this.obstacleCount; i++) {
      const obstacleSrc = obstaclesSrc[i % obstaclesSrc.length];
      const obstacle = new Obstacle(
        this.context,
        i % obstaclesSrc.length,
        obstacleSrc,
        this.obstacleX + i * gap,
        this.canvas.height / 2 - this.obstacleHeight / 2,
        this.obstacleWidth,
        this.obstacleHeight
      );
      obstacleArray.push(obstacle);
    }
  }

  moveObstacles() {
    for (let i = 0; i < obstacleArray.length; i++) {
      let obstacle = obstacleArray[i];
      obstacle.draw();
      if (obstacle.x < -this.obstacleWidth) {
        obstacleArray.shift();
      }
    }
  }

  manageObstacles() {
    if (obstacleArray.length < this.obstacleCount) {
      this.createObstacles();
    }
    this.moveObstacles();
  }

  setRedRocket() {
    this.redRocket = new Image();
    this.redRocket.src = "./games/rocket/assets/red-rocket.png";
    this.context.drawImage(
      this.redRocket,
      this.rocketX,
      this.canvas.height - this.rocketHeight,
      this.rocketWidth,
      this.rocketHeight
    );
    this.rocketX += this.rocketSpeed;
    if (this.rocketX > this.canvas.width - this.rocketWidth) {
      this.rocketX = 0;
    }
  }

  setBlueRocket() {
    this.blueRocket = new Image();
    this.blueRocket.src = "./games/rocket/assets/blue-rocket.png";
    this.context.drawImage(
      this.blueRocket,
      this.rocketX,
      0,
      this.rocketWidth,
      this.rocketHeight
    );
  }

  setBackground() {
    const bgImg = new Image();
    bgImg.src = "./games/rocket/assets/bg.png";

    let ptrn = this.context.createPattern(bgImg, "repeat");
    this.context.fillStyle = ptrn;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createRedBullet() {
    const redBullet = new Bullet(
      this.context,
      this.rocketX + this.rocketWidth / 2,
      this.canvas.height - this.rocketHeight,
      "#ff0000",
      this.obstacleWidth,
      this.obstacleHeight,
      "bottom"
    );
    redBulletArray.push(redBullet);
  }

  createBlueBullet() {
    const blueBullet = new Bullet(
      this.context,
      this.rocketX + this.rocketWidth / 2,
      this.rocketHeight,
      "#0000FF",
      this.obstacleWidth,
      this.obstacleHeight,
      "top"
    );
    blueBulletArray.push(blueBullet);
  }

  drawRedBullet() {
    redBulletArray.forEach((redBullet) => redBullet.draw());
  }

  drawBlueBullet() {
    blueBulletArray.forEach((blueBullet) => blueBullet.draw());
  }

  moveRedBullet() {
    redBulletArray.forEach((redBullet) => {
      redBullet.move();
      if (redBullet.y <= this.canvas.height / 2 - this.obstacleHeight) {
        redBulletArray.shift();
        this.fireRedBullet = false;
      }
    });
  }

  moveBlueBullet() {
    blueBulletArray.forEach((blueBullet) => {
      blueBullet.move();
      if (blueBullet.y >= this.canvas.height / 2 + this.obstacleHeight) {
        blueBulletArray.shift();
        this.fireBlueBullet = false;
      }
    });
  }

  manageRedBullet() {
    if (redBulletArray.length === 0 && this.fireRedBullet) {
      this.createRedBullet();
    }
    if (this.fireRedBullet) {
      this.moveRedBullet();
    }
  }

  manageBlueBullet() {
    if (blueBulletArray.length === 0 && this.fireBlueBullet) {
      this.createBlueBullet();
    }
    if (this.fireBlueBullet) {
      this.moveBlueBullet();
    }
  }

  detectBlueBulletCollision() {
    if (blueBulletArray.length > 0) {
      let blueBullet = blueBulletArray[0];
      obstacleArray.forEach((obstacle) => {
        if (detectRectangularCollision(blueBullet, obstacle)) {
          //Red obstacle Collision detection
          if (obstacle.key === 0) {
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
          }
          //Blue obstacle Collision detection
          else if (obstacle.key === 1) {
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
          }
        }
      });
    }
  }

  detectRedBulletCollision() {
    if (redBulletArray.length > 0) {
      let redBullet = redBulletArray[0];
      obstacleArray.forEach((obstacle) => {
        if (detectRectangularCollision(redBullet, obstacle)) {
          //Red obstacle Collision detection
          if (obstacle.key === 0) {
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
          }
          //Blue obstacle Collision detection
          else if (obstacle.key === 1) {
            obstacleArray.splice(obstacleArray.indexOf(obstacle), 1);
          }
        }
      });
    }
  }
}
