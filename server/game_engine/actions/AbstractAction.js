class AbstractAction {
    constructor(player){
        if(this.constructor === AbstractAction){
            throw new TypeError('Abstract constructor called.');
        }
        this.player = player;
    }

    succeed(){
        throw new TypeError('Abstract method called.');
    }

    fail(){
        throw new TypeError('Abstract method called.');
    }

    challenge(){
        throw new TypeError('Abstract method called.');
    }
}