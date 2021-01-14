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

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 0, y: 0 },
  { x: 80, y: 100 },
  { x: 90, y: 200 },
  { x: 100, y: 120 },
  { x: 300, y: 210 },
  { x: 350, y: 50 },
  {x:390, y:390}
];
points.forEach((element) => {
  var child1 = document.createElement("div");
  graphContainer.appendChild(child1);
  child1.setAttribute('class','child')
  child1.style.height = "10px";
  child1.style.width = "10px";
  graphContainer.style.position = "relative";
  child1.style.position = "absolute";
  var elementX = element.x-1;
  var elementY = element.y-1;
  child1.style.top = elementY + 'px';
  child1.style.left = elementX + 'px';
  child1.style.backgroundColor = "red";
  child1.style.borderRadius = "50%";
});
children = document.querySelectorAll('.child');

children.forEach(child => {
    child.addEventListener('click',(e)=>{
        e.target.parentNode.removeChild(e.target);
    });
});
