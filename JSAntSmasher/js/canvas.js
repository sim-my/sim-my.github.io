//Note: Image of ants are square with height and width twice the radius

const canvas = document.querySelector("canvas");
const scoreEl = document.querySelector("#scoreEl");

const c = canvas.getContext("2d");

canvas.width = innerWidth - 80;
canvas.height = innerHeight - 80;

const count = 50;

let score = 0;

canvas.addEventListener('click', (event) => {
  var x = event.clientX;
  var y = event.clientY;

  for (let i = 0; i < ants.length; i++) {
    var ant = ants[i];
    if (x >= ant.x
      && x <= ant.x + (ant.radius *2)
      && y >= ant.y
      && y <= ant.y + (ant.radius *2)
    ) {
      ants.splice(i, 1);
      score ++;
      scoreEl.innerHTML = score;
    }
  }
});


const minRadius = 5;
const maxRadius = 50;

const mass = 1;

const colors = [
  "#2185C5",
  "#7ECEFD",
  "#FA8072",
  "#40E0D0",
  "#CCCCFF",
  "#DE3163",
];
getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  return {mouseX:x, mouseY:y}
}

let antX, antY;

// Ants
class Ant {
  constructor(x, y, radius,mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass;
    this.velocity = {
      x: Math.random() - 2,
      y: Math.random() - 2,
    };
  }

  draw() {
    var img = document.querySelector('.antImage');
    c.drawImage(img, this.x, this.y, this.radius, this.radius);
    
    
 }

  update() {
    this.draw();


    for (let i = 0; i < ants.length; i++) {

      if (this === ants[i]) continue;
      if (
        calculateDistance(this.x, this.y, ants[i].x, ants[i].y) -
          (this.radius + ants[i].radius) <
        0
      ) {
        resolveCollision(this, ants[i]);
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    



    this.x += this.velocity.x;
    this.y += this.velocity.y;

  }
}

const init = () => {
  ants = [];

  for (let i = 0; i < count; i++) {
    let radius = generateRandomFromRange(minRadius, maxRadius);
    let x = generateRandomFromRange(radius, canvas.width - radius);
    let y = generateRandomFromRange(radius, canvas.height - radius);

    if (i !== 0) {
      for (let j = 0; j < ants.length; j++) {
        if (
          calculateDistance(x, y, ants[j].x, ants[j].y) -
            (radius + ants[j].radius) <
          0
        ) {
          x = generateRandomFromRange(radius, canvas.width - radius);
          y = generateRandomFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    ants.push(new Ant(x, y, radius, mass));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ants.forEach((ant) => {
    ant.update();
  });
};

init();
animate();
