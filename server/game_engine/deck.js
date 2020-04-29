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

    /**
     * Constructor
     * @class
     */
    constructor(){
        this.cards = [];
        this.coins = 50;
        this._initCards();
    }

    /**
     * Shuffles the cards in the deck.
     * 
     * Uses the modern version of the Fisher-Yates
     * shuffle algorithm. @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
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

    /**
     * Draws a number of cards from the deck.
     * 
     * @param {int} num Number of cards to draw
     * 
     * @returns {Card} Card on top
     */
    draw(num){
        return this.cards.splice(0, num);
    }

    /**
     * Deals to each player.
     * 
     * Deals in a realistic card-game way, giving
     * one to each player before going back around
     * again. Each player gets 2 cards and 2 coins.
     * 
     * @param {List} players 
     */
    deal(players){
        for (let i = 0; i < 2; i++) {
            players.forEach(element => {
                element.addCard(this.draw(1)[0]);
            });
        }

        players.forEach(element => {
            element.addCoins(2);
            this.removeCoins(2);
        })
    }

    /**
     * Adds coins to the deck
     * 
     * @param {int} num 
     */
    addCoins(num){
        this.coins += num;
    }

    /**
     * Removes coins from the deck
     * 
     * @param {int} num 
     */
    removeCoins(num){
        this.coins -= num;
    }

    /**
     * Adds a card to the deck and shuffles it.
     * 
     * @param {Card} card 
     */
    addCard(card){
        this.cards.push(card);
        this.shuffle();
    }

    /**
     * Initializes the cards in the deck.
     * 
     * Two cards of each type are added to the deck and shuffled.
     */
    _initCards(){
        console.log('init cards');
        for (let i = 1; i <= 5; i++) {
            for (let j = 0; j < 3; j++){
                this.cards.push(new Card(i))
            }
        }
        this.shuffle();  
    }
}

module.exports = Deck;