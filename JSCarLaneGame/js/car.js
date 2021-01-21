const carImage = new Image();

let mode = 0;

let speedChange = false;

let obstacleArray = [];

let score = 0;

let currentSpeed = 0;

const enterScreen = document.querySelector(".start-menu");
const exitMenu = document.querySelector(".exit-menu");

const vehicleHeight = 215;
const vehicleWidth = 92;

carImage.src = "images/my_car.png";

const myCarY = canvas.height * (2 / 3);

const possibleCarLanes = [
  canvas.width * (11 / 50),
  canvas.width * (19 / 50),
  canvas.width * (11 / 20),
];

let current = 0;

const myCarAnimate = () => {
  let x = possibleCarLanes[current];
  let y = myCarY;
  c.drawImage(carImage, x, myCarY);

  speedHandler();
  currentScore = Math.trunc(score / 5);
  if (speedChange) {
    carSpeed += 2;
    speedChange = false;
  } 
  requestAnimationFrame(myCarAnimate);
};

const speedHandler = () => {
let nextSpeed;
  if (mode === 2 && score !== 0) {
        if (parseInt(scoreEl.innerHTML) % 10 === 0) {
        nextScore = parseInt(scoreEl.innerHTML)
        if(currentScore !== nextScore) {
            speedChange = true;
        }           
    }
  }
};

const keyPressHandler = (event) => {
  if (event.keyCode === 37) {
    current--;
    if (current < 0) {
      current = 0;
    }
  }

  if (event.keyCode === 39) {
    current++;
    if (current > 2) {
      current = 2;
    }
  }

  if (event.keyCode === 13) {
    if (mode === 0) {
      carSpeed = 10;
      enterScreen.style.display = "none";
      mode = 2;
    } else if (mode === 1) {
      carSpeed = 10;
      exitMenu.style.display = "none";
      c.clearRect(0, 0, canvas.width, canvas.height);
      obstacleArray = [];
      myCarAnimate();
      score = 0;
      scoreEl.innerHTML = Math.trunc(score / 5);
      mode = 2;
    }
  }
};

window.addEventListener("keydown", keyPressHandler);

myCarAnimate();
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
    image.src = `images/${this.type}.png`;
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
      timer = 0;
      bulletSign.style.display = 'none';
      if(localStorage.getItem('highscore') < score/5){
          highscore = Math.trunc(score / 5);
           localStorage.setItem('highscore', highscore);
          document.querySelector('.high-score-span').innerHTML = highscore;
      }
      score = 0;
      exitMenu.style.display = "block";
    } 
    if (myCarY < obstacle.y - vehicleHeight) {
      score = score + 1;
      console.log(score)
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
