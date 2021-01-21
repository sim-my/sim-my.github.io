
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
  bird.draw();
  pipes.draw();
  wall.draw();
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
