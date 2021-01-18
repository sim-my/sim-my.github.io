const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth - 80;
canvas.height = innerHeight - 80;

const count = 150;

canvas.addEventListener('click', function (event) {
  var x = event.clientX;
  var y = event.clientY;

  for (let i = 0; i < ants.length; i++) {
    var ant = ants[i];
    if (x >= ant.x
      && x <= ant.x + ant.radius
      && y >= ant.y
      && y <= ant.y + ant.radius
    ) {
      ants.splice(i, 1);
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
  constructor(x, y, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.velocity = {
      x: Math.random() - 0.5 * 2,
      y: Math.random() - 0.5 * 2,
    };
  }

  draw() {
    var img = new Image();
    img.src = './images/ant1.png';
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
    let color = generateRandomColor(colors);

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
    ants.push(new Ant(x, y, radius, color, mass));
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
