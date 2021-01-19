const obstacleType = ['ambulance', 'audi', 'car', 'mini_truck', 'mini_van', 'police', 'taxi'];
const possibleObstacleY = [-200, -450, -700]

obstacles = [];

obstacleCount = 3;
class Obstacle {
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;
    }

    spawn(){
        let image = new Image();
        image.src = `./images/${this.type}.png`
        c.drawImage(image, this.x, this.y)            
    }

    update(){
        this.spawn();
        this.y += carSpeed;
    }

}

let obstacleArray = [];

const generateObstacle = () =>{
    if(obstacleArray.length === 0){
        var possibleXIndex1 = generateRandomFromRange(0,possibleCarLanes.length - 1);
        var imageTypeIndex1 = generateRandomFromRange(0, obstacleType.length - 1);
        var possibleYIndex1 = generateRandomFromRange(0, 2);

        while(true){
            var possibleXIndex2 = generateRandomFromRange(0,possibleCarLanes.length - 1);
            var imageTypeIndex2 = generateRandomFromRange(0, obstacleType.length - 1);
            var possibleYIndex2 = generateRandomFromRange(0, 2);

            if(possibleXIndex1 !== possibleXIndex2 && possibleYIndex1 !== possibleYIndex2) break;
        }

        

        const obstacle1 = new Obstacle(possibleCarLanes[possibleXIndex1], possibleObstacleY[possibleYIndex1], obstacleType[imageTypeIndex1]);
        const obstacle2 = new Obstacle(possibleCarLanes[possibleXIndex2], possibleObstacleY[possibleYIndex2], obstacleType[imageTypeIndex2]);      

        obstacleArray.push(obstacle1);
        obstacleArray.push(obstacle2);
    }

}

const checkCollision = () =>{
    obstacleArray.forEach(obstacle => {
        if (possibleCarLanes[current] < obstacle.x + vehicleWidth &&
            possibleCarLanes[current] + vehicleWidth > obstacle.x &&
            myCarY < obstacle.y + vehicleHeight &&
            myCarY + vehicleHeight > obstacle.y) {
             alert('collided');
         }
    })
    
}


const animateObstacle = () =>{
    generateObstacle();
    checkCollision();
    obstacleArray.forEach(obstacle => {
        obstacle.update();
    });
    obstacleArray = obstacleArray.filter(obstacle => obstacle.y < canvas.height);
    requestAnimationFrame(animateObstacle);
}
animateObstacle();
