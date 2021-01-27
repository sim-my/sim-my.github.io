export default class Player {
    constructor(context, imageSrc, x, y, width, height){
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSrc = imageSrc;
    }

    draw(){
       const player  = new Image();
       player.src = this.imageSrc;
       this.context.drawImage(player, this.x, this.y, this.width, this.height);
    }
}