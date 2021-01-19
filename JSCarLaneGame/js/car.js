const carImage = new Image();

let mode = 0;

let obstacleArray = [];

let score = 0;

const enterScreen = document.querySelector('.start-menu');
const exitMenu = document.querySelector('.exit-menu');

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

    if(event.keyCode === 13){
        if(mode === 0){
            carSpeed = 10;
            enterScreen.style.display = 'none';
            mode = 2;
        }
        else if(mode === 1){
            carSpeed = 10;
            exitMenu.style.display = 'none';
            c.clearRect(0, 0 , canvas.width, canvas.height);
            obstacleArray = [];
            myCarAnimate();
            score = 0;
            scoreEl.innerHTML = score;
            mode = 2;
        }

    }

}


window.addEventListener('keydown', keyPressHandler);


myCarAnimate();