export default class Obstacle {
    constructor(context, image, x, y, w, h){
        this.context = context;
        this.image = image;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(){
        const obstacle = new Image();
        obstacle.src = this.image;
        this.context.drawImage(obstacle, this.x, this.y, this.w, this.h);  
        this.move();     
    }

    move() {
        this.x -= 10;    
    }
}