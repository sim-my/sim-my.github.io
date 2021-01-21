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
  