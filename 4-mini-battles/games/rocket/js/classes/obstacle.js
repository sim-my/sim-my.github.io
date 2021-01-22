//key is 0 for red, 1 for blue
export default class Obstacle {
    constructor(context,key, image, x, y, w, h){
        this.context = context;
        this.key = key;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    draw(){
        const obstacle = new Image();
        obstacle.src = this.image;
        this.context.drawImage(obstacle, this.x, this.y, this.width, this.height);  
        this.move();     
    }

    move() {
        this.x -= 10;    
    }
}