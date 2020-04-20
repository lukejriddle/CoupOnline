import React, { Component } from 'react';

import Card from '../Card/Card';
import Coin from '../Coin/Coin';
import Challenge from '../Challenge/Challenge';
import ActionList from '../ActionList/ActionList';

class Player extends Component {
    render(){
        return (
            <div className="gamePlayer">
                <div className="playerChallenge">
                    <Challenge canChallenge={ this.props.turn.lastAction.canChallenge } lastAction={ this.props.turn.lastAction } />
                </div>
                <div className="playerItems">
                    {
                        Object.keys(this.props.player.cards).map((key) => {
                            return (
                                <Card className="playerCard" card={ this.props.player.cards[key] }/>
                            )
                        })
                    }
                    <Coin className="playerCoin" />
                    <h2>{ this.props.player.coins }</h2>
                </div>
                <div className="playerActions">
                    <ActionList className="actionList" list={ this.props.turn.availableActions } />
                </div>
            </div>
        )
    }
}

export default Player;