import React, { Component } from 'react';

import Card from '../../Card/Card';
import Coin from '../../Coin/Coin';

import './Deck.css';

class Deck extends Component {
    render(){
        return (
            <div className="gameDeck flex-row">
                <div className="deckItems flex-row">
                    <Card className="deckCard" card={ this.props.deck.cards[0] } />
                    <div className="deckCoins flex-row">
                        <Coin className="deckCoin" />
                        <h2> x { this.props.deck.coins }</h2>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Deck;