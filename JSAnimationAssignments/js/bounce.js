var app = document.getElementById("app");
var graphContainer = document.createElement("div");
app.appendChild(graphContainer);
app.style.height = "800px";
app.style.position = "relative";
graphContainer.style.position = "absolute";
graphContainer.style.top = "20%";
graphContainer.style.left = "20%";

graphContainer.style.width = "400px";
graphContainer.style.height = "400px";
graphContainer.style.border = "1px solid #000";

var ball = document.createElement("div");
graphContainer.appendChild(ball);
ball.style.borderRadius = '50%';
ball.style.height = '50px';
ball.style.width = '50px';

ball.style.backgroundColor = '#a2c';
graphContainer.style.position = "relative";
ball.style.position = "absolute";
ball.style.top = "175px";
ball.style.left = "175px";


var x=0;
var y=0;
count = 5;
var touchUp = true;
var touchDown = false;
function repeatOften() {
    if(y==0){
        touchUp = true;
        touchDown = false
    }
    else if(y>350){
        touchDown = true
        touchUp = false;
    }
    if(touchUp==true){
        y = y+count;
    }
    else if(touchDown==true){
        y = y-count;
    }
    ball.style.top = y+"px";
    requestAnimationFrame(repeatOften);
  }
  requestAnimationFrame(repeatOften);