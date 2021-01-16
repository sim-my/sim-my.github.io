// const containerDot = document.querySelector("#carousel-container-1 .dot-container-1");

// for (let i = 0, len = containerDot.children.length; i < len; i++) {

//   ((index) => {
//     containerDot.children[i].onclick = () => {
//       let prevIndex = currentIndex;
//       currentIndex = index;

//       let diff = currentIndex - prevIndex;
//       setActiveDot();
//       let count =  200;
//       images.forEach((image, j) => {        
//         let imgLeft = parseInt(image.style.left);
//         let current = imgLeft; 
//         var setImgPos = setInterval(() => {
//           image.style.left = imgLeft + "px";          
//           if(diff>=0) {
//             imgLeft = imgLeft - count;  
//             if (imgLeft < (current - (width*diff))) {
//               clearInterval(setImgPos);
//             }
//           }   
//           else{
//             imgLeft = imgLeft + count;  
//             if (imgLeft > (current - (width * diff))) {
//               clearInterval(setImgPos);
//             }
//           }    

//         }, 100);
//       });
      
//     };
//   })(i);
// }

// setInterval(()=>{
//   animateNext()
// },2000)