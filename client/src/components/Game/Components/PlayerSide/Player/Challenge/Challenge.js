import React, { Component } from 'react';

import ChallengeButton from './ChallengeButton/ChallengeButton';

import './Challenge.css';

class Challenge extends Component {
    render(){
        return(
            <div className="playerChallenge flex-row">
                <ChallengeButton active={ this.props.lastAction && this.props.lastAction.canChallenge &&
                    this.props.player != this.props.lastAction.player && !this.props.player.isOut}/>
            </div>
        )
    }
}

export default Challenge;