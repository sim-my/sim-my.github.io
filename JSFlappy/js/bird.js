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