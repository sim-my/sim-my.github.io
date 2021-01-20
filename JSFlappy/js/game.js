const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = 580;
canvas.width = 480;

let frames = 0;

let period = 5;

//background
const background = {
  x: 0,
  y: 100,
  width: 200,

  draw: () => {
    const bgImage = new Image();
    bgImage.src = "./images/flappy-bg.png";
    c.drawImage(bgImage, background.x, background.y);
    c.drawImage(bgImage, background.x + background.width, background.y);
  },
};

//wall
const wall = {
  x: 0,
  y: 468,
  width: 320,
  height: 200,
  speed: 2,

  draw: () => {
    const wallImage = new Image();
    wallImage.src = "./images/flappy-wall.png";
    c.drawImage(wallImage, wall.x, wall.y, wall.width, wall.height);
    c.drawImage(wallImage, wall.x + wall.width, wall.y, wall.width, wall.height);
  },

  update : () =>{
      if(state.current === state.inGame){
          wall.x = (wall.x - wall.speed) % (wall.width / 2)
      }
  }
};

//bird
const bird = {
  x: 50,
  y: 150,
  gravity: 0.2,
  height: 50,
  width: 50,
  lift: 10,
  frame: 0,
  speed: 0,

  draw: () => {
    const upBird = new Image();
    upBird.src = "./images/upbird.png";

    const midBird = new Image();
    midBird.src = "./images/midbird.png";

    const downBird = new Image();
    downBird.src = "./images/downbird.png";

    birdArray = [upBird, midBird, downBird, midBird];

    let currentBird = birdArray[bird.frame];
    c.drawImage(currentBird, bird.x, bird.y, bird.width, bird.height);
  },

  flap: () => {
      bird.speed -= bird.lift;
  },
  update: () => {
    bird.frame += frames % 5 === 0 ? 1 : 0;
    bird.frame = bird.frame % birdArray.length;

    if(state.current === state.initial){
        bird.y = 150;
        bird.speed = 0;
    }
    else{
        bird.speed += bird.gravity;
        bird.y += bird.speed; 
        if(bird.y >= wall.y - bird.height){
            bird.y = wall.y - bird.height;
            state.current = state.gameOver;
            bird.frame = 0;
        }
        if(bird.y <= 0){
            state.current = state.gameOver;
            bird.frame = 0;
        }
    }
  },
};

//entry-message
const entryMessage = {
  x: canvas.width / 2,
  y: 90,
  width: 200,

  draw: () => {
    if (state.current === state.initial) {
      const entryMessageImage = new Image();
      entryMessageImage.src = "./images/entry-message.png";
      c.drawImage(
        entryMessageImage,
        entryMessage.x - entryMessage.width / 2,
        entryMessage.y
      );
    }
  },
};

//exit-message
const exitMessage = {
  x: canvas.width / 2,
  y: 90,
  width: 200,

  draw: () => {
    if (state.current === state.gameOver) {
      const exitMessageImage = new Image();
      exitMessageImage.src = "./images/exit-message.png";
      c.drawImage(
        exitMessageImage,
        exitMessage.x - exitMessage.width / 2,
        exitMessage.y
      );
    }
  },
};

//game-states
const state = {
  current: 0,
  initial: 0,
  inGame: 1,
  gameOver: 2,
};

//clickHandler Function
const clickHandler = (event) => {
  switch (state.current) {
    case state.initial:
      state.current = state.inGame;
      break;

    case state.inGame:
      bird.flap();
      break;

    case state.gameOver:
      state.current = state.initial;
      break;
  }
};

//game control
canvas.addEventListener("click", clickHandler);

const draw = () => {
  c.fillStyle = "#70c5ce";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.draw();
  wall.draw();
  bird.draw();
  entryMessage.draw();
  exitMessage.draw();
};

const update = () => {
  draw();
  wall.update();
  bird.update();
  
};

const animate = () => {
  update();
  frames++;
  requestAnimationFrame(animate);
};

animate();
