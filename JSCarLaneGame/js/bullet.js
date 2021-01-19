let timer = 0;
let bulletY = myCarY -10;
let releaseBullet = false;

class Bullet{
    constructor(y){
        this.y = y;
    }
    createBullet = () => {
        let image = new Image();
        image.src = "./images/bullet.png";
        c.drawImage(image, possibleCarLanes[current] + vehicleWidth + 10,this.y);
    };

    updateBullet = () =>{
        window.addEventListener('keydown', (ev) => this.bulletHandler(ev));
        this.createBullet();   
        if(releaseBullet){
            this.y -= 5;
        }             
    }

    bulletHandler(event){
        if(event.code === 'Space'){
          releaseBullet = true;
        }
    }

}

const bulletArray = [];

const generateBullet = () => {
    if (mode === 2 && bulletArray.length === 0) {
        releaseBullet = false;
        timer ++;
        if (timer % 500 === 0){  
          const bullet = new Bullet(bulletY);
          bulletArray.push(bullet);
          timer = 0;
        }
     }
}


const animateBullet = () => {
generateBullet();
bulletArray.forEach(bullet => {
      bullet.updateBullet();
      if(bullet.y < 0){
          console.log(bulletY)
        bulletArray.splice(bulletArray.indexOf(bullet), 1);
      }
 });


  requestAnimationFrame(animateBullet);
};



animateBullet();


