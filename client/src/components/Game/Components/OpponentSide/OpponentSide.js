import React, { Component } from 'react';

import Opponent from './Opponent/Opponent';
import Deck from './Deck/Deck';

import './OpponentSide.css';

class OpponentSide extends Component {
    render(){
        return(
            <div className="opponentSide flex-row">
                <Opponent player={ this.props.opponents[0] } />
                <Opponent player={ this.props.opponents[1] } />
                <Opponent player={ this.props.opponents[2] } />
                <Opponent player={ this.props.opponents[3] } />
                <Deck deck={ this.props.deck } />
                <Opponent player={ this.props.opponents[4] } />
            </div>
        )
    }
}

export default OpponentSide;