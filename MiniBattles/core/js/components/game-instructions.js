export default class GameInstructions {
    constructor(messsage){
        this.messsage = messsage;
        
        this.instructionShowTime = 2000;
        this.gameInstructions = document.querySelector('.instructions');
    }

    show(){
        this.changeText(this.messsage);
        this.gameInstructions.style.display = 'block';
    }

    hide(){
        this.gameInstructions.style.display = 'none';
    }

    changeText(text){
        this.gameInstructions.innerHTML = text;
    }    

}