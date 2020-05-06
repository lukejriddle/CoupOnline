/**
 * @fileoverview Deck class
 * @author Luke Riddle
 */

const Card = require('./card');

/**
 * Represents the deck.
 * 
 * Each deck will have 15 cards, 3 of each of the 5 types.
 * Throughout the game, the number of cards after dealing
 * will not change, as cards are only exchanged, never put
 * back into the deck.
 */
class Deck {

    constructor(){
        this.cards = [];
        this.coins = 50;
        this._initCards();
        this.shuffle();
    }

    /**
     * Uses the modern version of the Fisher-Yates
     * shuffle algorithm.
     */
    shuffle(){
        var j, x, i;
        for(i = this.cards.length - 1; i > 0; i--){
            j = Math.floor(Math.random() * (i + 1));
            x = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = x;
        }
    }

    draw(num){
        return this.cards.splice(0, num);
    }

    deal(players){
        for (let i = 0; i < 2; i++) {
            players.forEach(element => {
                element.addCard(this.draw(1)[0]);
            });
        }

        players.forEach(element => {
            element.drawCoins(2);
        })
    }

    addCoins(num){
        this.coins += num;
    }

    removeCoins(num){
        if(num <= this.coins){
            this.coins -= num;
            return num;
        } else {
            let temp = this.coins;
            this.coins = 0;
            return temp;
        }
    }

    addCard(card){
        this.cards.push(card);
        this.shuffle();
    }

    _initCards(){
        console.log('init cards');
        for (let i = 1; i <= 5; i++) {
            for (let j = 0; j < 3; j++){
                this.cards.push(new Card(i))
            }
        }
    }
}

module.exports = Deck;