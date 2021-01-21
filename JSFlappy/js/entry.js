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
  