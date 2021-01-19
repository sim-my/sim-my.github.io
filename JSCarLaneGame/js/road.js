let carSpeed = 10;
let roadTop = -canvas.height;

const roadBg = new Image();

roadBg.src = './images/road.jpg';
const roadAnimate = () => {

c.drawImage(roadBg, canvas.width/4, roadTop, canvas.width/2, 2 * canvas.height);
      
    roadTop += carSpeed;  
    if( roadTop >= 0) roadTop = -canvas.height;

    requestAnimationFrame(roadAnimate);
}    
roadAnimate();
