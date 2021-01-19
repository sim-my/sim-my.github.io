let carSpeed = 10;
let roadTop = 0;

const roadBg = new Image();

roadBg.src = './images/road.jpg';
const roadAnimate = () => {

c.drawImage(roadBg, canvas.width/4, roadTop - canvas.height, canvas.width/2, 2 * canvas.height);
      
    roadTop += carSpeed;  
    if( roadTop > canvas.height ) roadTop = 0;

    requestAnimationFrame(roadAnimate);
}    
roadAnimate();
