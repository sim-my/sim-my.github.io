let highscore = localStorage.getItem('highscore') || 0;
let bulletSpeed = 5;

const bulletSign = document.querySelector('.ammo-sign')

if(!localStorage.getItem('highscore')){
    highscore = 0;
    localStorage.setItem('highscore', highscore);    
}

else{
    highscore = localStorage.getItem('highscore');
}

const bullet = document.querySelector('.bullet');

document.querySelector('.high-score-span').innerHTML = highscore;

const obstacleType = [
  "ambulance",
  "audi",
  "car",
  "mini_truck",
  "mini_van",
  "police",
  "taxi",
];
const possibleObstacleY = [-200, -450, -700];

const scoreEl = document.querySelector(".scoreboard .score-span");

obstacles = [];

obstacleCount = 3;
class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  spawn() {
    let image = new Image();
    image.src = `./images/${this.type}.png`;
    c.drawImage(image, this.x, this.y);
  }

  update() {
    this.spawn();
    this.y += carSpeed;
  }
}

const generateObstacle = () => {
  if (obstacleArray.length === 0) {
    var possibleXIndex1 = generateRandomFromRange(
      0,
      possibleCarLanes.length - 1
    );
    var imageTypeIndex1 = generateRandomFromRange(0, obstacleType.length - 1);
    var possibleYIndex1 = generateRandomFromRange(0, 2);

    while (true) {
      var possibleXIndex2 = generateRandomFromRange(
        0,
        possibleCarLanes.length - 1
      );
      var imageTypeIndex2 = generateRandomFromRange(0, obstacleType.length - 1);
      var possibleYIndex2 = generateRandomFromRange(0, 2);

      if (
        possibleXIndex1 !== possibleXIndex2 &&
        possibleYIndex1 !== possibleYIndex2
      )
        break;
    }

    const obstacle1 = new Obstacle(
      possibleCarLanes[possibleXIndex1],
      possibleObstacleY[possibleYIndex1],
      obstacleType[imageTypeIndex1]
    );
    const obstacle2 = new Obstacle(
      possibleCarLanes[possibleXIndex2],
      possibleObstacleY[possibleYIndex2],
      obstacleType[imageTypeIndex2]
    );

    obstacleArray.push(obstacle1);
    obstacleArray.push(obstacle2);
  }
};

const checkCollision = () => {
  obstacleArray.forEach((obstacle) => {
    if (
      (possibleCarLanes[current] < obstacle.x + vehicleWidth &&
        possibleCarLanes[current] + vehicleWidth > obstacle.x &&
        myCarY < obstacle.y + vehicleHeight &&
        myCarY + vehicleHeight > obstacle.y + vehicleHeight) ||
      (obstacle.x < possibleCarLanes[current] + vehicleWidth &&
        obstacle.x + vehicleWidth > possibleCarLanes[current]  &&
        obstacle.y < myCarY + vehicleHeight &&
        obstacle.y + vehicleHeight > myCarY + vehicleHeight)
    ) {
    mode = 1;
      carSpeed = 0;
      bulletArray = [];
      score = 0;
      timer = 0;
      bulletSign.style.display = 'none';

      if(localStorage.getItem('highscore') < score/5){
          highscore = Math.trunc(score / 5);
          console.log(highscore)
          localStorage.setItem('highscore', highscore);
          document.querySelector('.high-score-span').innerHTML = highscore;
      }
      exitMenu.style.display = "block";
    } else if (myCarY < obstacle.y - vehicleHeight) {
      score = score + 1;
      scoreEl.innerHTML = Math.trunc(score / 5);
    }
  });
};


const animateObstacle = () => {
  generateObstacle();
  checkCollision();
  obstacleArray.forEach((obstacle) => {
    obstacle.update();
  });
  obstacleArray = obstacleArray.filter(
    (obstacle) => obstacle.y < canvas.height
  );
  requestAnimationFrame(animateObstacle);
};

animateObstacle();
