import React, { Component } from 'react';

import PlayerCards from './PlayerCards/PlayerCards';
import Coin from '../../../Coin/Coin';

import './PlayerItems.css';

class PlayerItems extends Component {
    render(){
        return(
            <div className="playerItems flex-row">
                <div className="contentDiv flex-row" />
                <PlayerCards turn={ this.props.turn } player={ this.props.player }/>
                <div className="contentDiv flex-row">
                    <Coin className="playerCoin" />
                    <h2>x { this.props.player.coins }</h2>
                </div>
            </div>
        )
    }
}

export default PlayerItems;