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