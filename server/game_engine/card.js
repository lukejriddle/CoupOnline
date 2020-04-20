/**
 * @fileoverview Card class
 * @author Luke Riddle
 */

/**
 * Represents a card.
 */
class Card {

    /**
     * Constructor
     * 
     * @param {int} value The type of card @see cardtypes.js
     */
    constructor(value) {
        this.value = value;
        this.faceUp = false;
    }

    /**
     * Turns the card face up.
     */
    turnFaceUp(){
        this.faceUp = true;
    }
}

module.exports = Card;