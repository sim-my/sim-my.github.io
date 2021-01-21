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