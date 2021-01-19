const carImage = new Image();

const vehicleHeight = 215;
const vehicleWidth = 92;

carImage.src = './images/my_car.png';

const myCarY = canvas.height * (2/3);

const possibleCarLanes = [canvas.width * (11/50), canvas.width * (19/50), canvas.width * (11/20)]

let current = 0;

const myCarAnimate = () => {
   let x = possibleCarLanes[current];
   let y =  myCarY;
   c.drawImage(carImage, x, myCarY);
   
   requestAnimationFrame(myCarAnimate);    
}

const keyPressHandler = (event) => {
    if(event.keyCode === 37){
        current --;
        if(current < 0){
            current = 0;
        }
    }

    if(event.keyCode === 39){
        current ++;
        if(current > 2){
            current = 2;
        }
    }
}


window.addEventListener('keydown', keyPressHandler);


myCarAnimate();