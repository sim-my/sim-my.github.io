export default class Obstacle {
    constructor(context, imageSrc, x, y, width, height){
        this.context = context;
        this.imageSrc = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        const obstacle = new Image();
        obstacle.src = this.imageSrc;
        this.context.drawImage(obstacle, this.x, this.y, this.width, this.height);
    }

    move(dx = 0, dy = 0, newImageSrc =  this.imageSrc){
        this.draw();
        this.x += dx;
        this.y += dy;
        this.imageSrc = newImageSrc;
    }
}