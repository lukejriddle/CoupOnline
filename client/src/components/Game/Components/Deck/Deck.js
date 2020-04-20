import React, { Component } from 'react';

import Card from '../Card/Card';
import Coin from '../Coin/Coin';

class Deck extends Component {
    render(){
        return (
            <div className="gameDeck">
                <div className="deckItems">
                    <Card className="deckCard" card={ this.props.deck.cards[0] } />
                    <Coin className="deckCoin" />
                    <h2>{ this.props.deck.coins }</h2>
                </div>
            </div>
        )
    }
}

export default Deck;