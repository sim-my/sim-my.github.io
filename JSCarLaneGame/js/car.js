const carImage = new Image();

carImage.src = './images/my_car.png';

const myCarAnimate = () => {
    c.drawImage(carImage, canvas.width/4 - 30, canvas.height * (2/3));
    requestAnimationFrame(myCarAnimate);    
}

myCarAnimate();