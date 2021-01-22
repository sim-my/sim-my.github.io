import Game from "../../core/js/classes/game.js";

export default class Flames extends Game{
    start() {
        super.start();
        console.log("Flames Running");
        console.log(this.context);
    }

    init(){
        
    }
}