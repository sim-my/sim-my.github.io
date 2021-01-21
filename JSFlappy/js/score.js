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