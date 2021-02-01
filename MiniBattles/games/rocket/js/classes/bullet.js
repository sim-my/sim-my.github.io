export default class Bullet {
  constructor(context, canvas, x, y, color, rocketPosition, keyCode) {
    this.context = context;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = 50;
    this.height = 50;
    this.rocketPosition = rocketPosition;
    this.boundaryY = this.canvas.height / 2;
    this.keyCode = keyCode;

    window.addEventListener('keypress', (event) => this.handleKeyPress(event))
    
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

  fire(x,y) {
    if(this.rocketPosition === 'top'){
        this.y += 10;

        if(this.y >= this.boundaryY){
          this.reset(x, y); 
        }
    }
    else{
        this.y -= 10;
                
        if(this.y <= this.boundaryY){
          this.reset(x, y); 
        }
    }
   
       
  }

  update(x, y){
    this.draw();
    if(this.fireBullet){
      this.fire(x,y);
    }
    else{
      this.x = x;
      this.y = y;
    }
  }

  reset(X, Y){
    this.x = X;
    this.y = Y;
    this.fireBullet = false;
  }

  handleKeyPress(event){
    if(event.code === this.keyCode){
      this.fireBullet = true;
    }
  }

}