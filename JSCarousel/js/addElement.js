class Element {
  constructor(type, styleArray, parent, elClass, innerHTML) {
    this.type = type;
    this.styleArray = styleArray;
    this.parent = parent;
    this.elClass = elClass;
    this.innerHTML = innerHTML;
  }

  createElement() {
    let elem = document.createElement(this.type);
    elem.setAttribute('class', this.elClass);

    return elem;
  }

  addInnerHTML(){
    let elem = this.createElement();
    if(this.innerHTML){
        elem.innerHTML = this.innerHTML;
    }
    
    return elem    
  }

  addStyles() {
    let elem = this.addInnerHTML();
    this.styleArray.forEach((styleEl) => {
      let styleKey = Object.keys(styleEl)[0];
      elem.style[styleKey] = Object.values(styleEl)[0];
    });

    return elem;
  }

  addRelativePosition() {
    document.querySelector(this.parent).style.position = 'relative';
  }

  insertElement() {
    let elem = this.addStyles();
    document.querySelector(this.parent).appendChild(elem);
  }
}

//create dot container
const dotContainer = new Element(
  'div',
  [
    {height:'20px'},
    {width:'auto'},
    {position: 'absolute'},
    {bottom: '20px'},
    {left: '50%'},
    {transform: 'translate(-50%, -50%)'},
  ],
  '.carousel-container',
  'dot-container'
);
dotContainer.addRelativePosition();
dotContainer.insertElement();


//creating dots inside dot container
const dotsCount = 4;
for (let i = 0; i < dotsCount; i++) {
  window[`dot-${i}`] = new Element(
    'div',
    [
      {height:'15px'},
      {width:'15px'},
      {borderRadius:'50%'},
      {border:'1px solid #fff'},
      {zIndex:'99999'},
      {float:'left'},
      {marginRight:'10px'},
      {cursor:'pointer'}
    ],
    '.dot-container',
    'dot'
  );
  window[`dot-${i}`].insertElement();
}

//create next button
const nextButton = new Element(
    'button',
    [
        {outline:'none'},
        {border:'none'},
        {borderRadius:'50%'},
        {backgroundColor:'#000'},
        {color:'#fff'},
        {position:'absolute'},
        {right:'-20px'},
        {top:'50%'},
        {height:'42px'},
        {width:'42px'},
        {fontSize:'24px'},
        {cursor:'pointer'}
    ],
    '.carousel-container',
    'button-next',
    '&raquo;'
);
nextButton.addRelativePosition();
nextButton.insertElement();


//create left button
const prevButton = new Element(
    'button',
    [
        {outline:'none'},
        {border:'none'},
        {borderRadius:'50%'},
        {backgroundColor:'#000'},
        {color:'#fff'},
        {position:'absolute'},
        {left:'-20px'},
        {top:'50%'},
        {height:'42px'},
        {width:'42px'},
        {fontSize:'24px'},
        {cursor:'pointer'}
    ],
    '.carousel-container',
    'button-prev',
    '&laquo;',    
);
prevButton.addRelativePosition();
prevButton.insertElement();



