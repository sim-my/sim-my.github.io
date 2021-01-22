export default class Bullet {
  constructor(context, x, y, color, width, height, rocketPosition) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.rocketPosition = rocketPosition
    
  }

  draw() {
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      7,
      0,
      2 * Math.PI,
      false
    );
    this.context.fillStyle = this.color;
    this.context.fill();
    
  }

  move() {
    this.draw()
    if(this.rocketPosition === 'top'){
        this.y += 10;
    }
    else{
        this.y -= 10;
    }
    
  }
}
