export default class Player {
    constructor(y, canvas, context, image){
        this.x = 0;
        this.canvas = canvas;
        this.context = context;
        this.image = image;
        this.width = 50;
        this.height = 100;  
        this.y = y; 
        this.rocketSpeed = 5; 
        this.rightBoundary = this.canvas.width - this.width;          
    }
    
    draw(){
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(){
        this.draw();
        this.x += this.rocketSpeed;
        if (this.x > this.rightBoundary) {
        this.x = 0
        }
    }
}
