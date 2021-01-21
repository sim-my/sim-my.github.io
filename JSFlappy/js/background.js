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