import React, { Component } from 'react';

import Challenge from './Challenge/Challenge';
import PlayerItems from './PlayerItems/PlayerItems';
import ActionList from './ActionList/ActionList';

import './Player.css';

class Player extends Component {
    render(){
        return (
            <div className="gamePlayer flex-row">
                <Challenge lastAction={ this.props.turn.lastAction } 
                    player={ this.props.player } emitChallenge={ this.props.emitChallenge }/>
                <PlayerItems turn={ this.props.turn } player={ this.props.player }/>
                <div className="playerActions flex-row">
                    <ActionList className="actionList" turn={ this.props.turn } player={ this.props.player }
                    emitAction={ this.props.emitAction } opponents={ this.props.opponents } />
                </div>
            </div>
        )
    }
}

export default Player;