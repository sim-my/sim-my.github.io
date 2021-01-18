const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 40;
canvas.height = innerHeight - 40;

const count = 200;

const minRadius = 5;
const maxRadius = 50;

const mass = 1;

const colors = ['#2185C5', '#7ECEFD', '#FA8072', '#40E0D0', '#CCCCFF', '#DE3163'];


let balls;


// Balls
class Ball {
  constructor(x, y, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.velocity = {
        x: Math.random() - 0.5 * 2,
        y: Math.random() - 0.5 * 2
    }
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw();

    for( let i = 0; i < balls.length; i++){
        if(this === balls[i]) continue;
         if(calculateDistance(this.x, this.y, balls[i].x, balls[i].y) - (this.radius + balls[i].radius) < 0){
            resolveCollision(this, balls[i]);  
        }
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
        this.velocity.x = -this.velocity.x;        
    }

    if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
        this.velocity.y = -this.velocity.y;        
    }
    console.log(this.x)

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const init = () => {

  balls = [];

  for (let i = 0; i < count; i++) {
    let radius = generateRandomFromRange(minRadius, maxRadius); 
    let x = generateRandomFromRange(radius, canvas.width - radius);
    let y = generateRandomFromRange(radius, canvas.height - radius);
    let color = generateRandomColor(colors);

    if( i !== 0){
        for(let j = 0; j< balls.length; j++){
            if(calculateDistance(x, y, balls[j].x, balls[j].y) - (radius + balls[j].radius) < 0){
                x = generateRandomFromRange(radius, canvas.width - radius);
                y = generateRandomFromRange(radius, canvas.height - radius);
                
                j = -1;
            }

        }
    }
    balls.push(new Ball(x, y, radius, color, mass));
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  balls.forEach(ball => {
   ball.update();
  })
}

init()
animate()