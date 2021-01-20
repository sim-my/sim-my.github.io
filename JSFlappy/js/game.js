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
  radius: 20,
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
        score.score = 0;
        pipes.pipePosition = [];
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

//pipes
const pipes = {
  pipePosition : [],
  width: 100,
  height: 250,
  gap:200,
  maxY : -150,
  speed: 2,

  draw : () => {
    for(let i =0; i<pipes.pipePosition.length; i++){
      topPipeY = pipes.pipePosition[i].y;
      bottomPipeY = pipes.pipePosition[i].y + pipes.height + pipes.gap;
      topPipeImage = new Image();
      topPipeImage.src = './images/pipeTop.png';
      c.drawImage(
        topPipeImage,
        pipes.pipePosition[i].x,
        topPipeY,
        pipes.width,
        pipes.height
      );

      bottomPipeImage = new Image();
      bottomPipeImage.src = './images/pipeBottom.png';
      c.drawImage(
        bottomPipeImage,
        pipes.pipePosition[i].x,
        bottomPipeY,
        pipes.width,
        pipes.height
      );
    }
  },

  update : () => {
    
    if(state.current != state.inGame) return;
    
    if(frames % 150 === 0){
      pipes.pipePosition.push({
        x : canvas.width,
        y : pipes.maxY * (Math.random())
      })
    }

    for(let i = 0; i < pipes.pipePosition.length; i++){
      pipes.pipePosition[i].x -= pipes.speed;

      let bottomPipeY = pipes.pipePosition[i].y + pipes.height + pipes.gap;

      if(bird.x + bird.radius > pipes.pipePosition[i].x && bird.x - bird.radius < pipes.pipePosition[i].x + pipes.width && bird.y + bird.radius > pipes.pipePosition[i].y && bird.y - bird.radius < pipes.pipePosition[i].y + pipes.height){
        state.current = state.gameOver;
      }
      if(bird.x + bird.radius > pipes.pipePosition[i].x && bird.x - bird.radius < pipes.pipePosition[i].x + pipes.width && bird.y + bird.radius > bottomPipeY && bird.y - bird.radius < bottomPipeY + pipes.height){
        state.current = state.gameOver;
      }

      if(pipes.width + pipes.pipePosition[i].x <= 0){
        pipes.pipePosition.shift();
        score.score += 1;
        console.log(score.score);
        score.highScore = Math.max(score.score, score.highScore);
        localStorage.setItem('best', score.highScore)
      }

    }
  }
}

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
  height: 200,

  draw: () => {
    if (state.current === state.gameOver) {
      const exitMessageImage = new Image();
      exitMessageImage.src = "./images/exit-message.png";
      c.drawImage(
        exitMessageImage,
        exitMessage.x - exitMessage.width / 2,
        exitMessage.y,
        exitMessage.width,
        exitMessage.height
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

//score
const score = {
  highScore : parseInt(localStorage.getItem('best')) || 0,
  score : 0,
  draw : () => {
    c.fillStyle = '#FFFFFF';

    if(state.current === state.inGame){
      c.lineWidth = 2;
      c.font = '24px Teko';
      c.fillText(score.score, canvas.width/2, 50);
      c.strokeText(score.score, canvas.width / 2, 50);
    }

    else if(state.current === state.gameOver){
      c.font = '24px Teko';
      c.fillText(score.score, canvas.width / 2 + (exitMessage.width/4), 210);
      c.strokeText(score.score, canvas.width / 2 + (exitMessage.width/4), 210);

      c.fillText(score.highScore, canvas.width / 2 + (exitMessage.width/4), 260);
      c.strokeText(score.highScore, canvas.width / 2 + (exitMessage.width/4), 260);
    }
  }

}

//start button
const startBtn = {
  x: canvas.width / 2 - 100,
  y : canvas.height / 2 + 20,
  w: 200,
  h: 40,

  draw : () => {
    if(state.current === state.gameOver){
      const startBtnImage = new Image();
      startBtnImage.src = './images/start.png'
      c.drawImage(startBtnImage, startBtn.x, startBtn.y, startBtn.w, startBtn.h);
    }
  }

}

//clickHandler Function
const clickHandler = (event) => {
 
  switch (state.current) {
    case state.initial:
      state.current = state.inGame;
      canvas.style.cursor = 'pointer';
      break;

    case state.inGame:
      canvas.style.cursor = 'default';
      bird.flap();
      break;

    case state.gameOver:
      let rect = canvas.getBoundingClientRect();

      let rectLeft = rect.left;
      let rectTop = rect.top;

      if(event.clientX >= rectLeft + canvas.width/2 - 50 && event.clientX <=rectLeft + canvas.width/2 + 50 && event.clientY >= canvas.height / 2 + 40 + rectTop && event.clientY <= canvas.height / 2 + 60 + rectTop){
        state.current = state.initial;
        canvas.style.cursor = 'pointer';
        break;
      }
      
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
  pipes.draw();
  entryMessage.draw();
  exitMessage.draw();
  startBtn.draw();
  score.draw();
};

const update = () => {
  draw();
  wall.update();
  bird.update();
  pipes.update();
};

const animate = () => {
  update();
  frames++;
  requestAnimationFrame(animate);
};

animate();
