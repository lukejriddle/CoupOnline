import React, { Component } from 'react';

import ChallengeButton from './ChallengeButton/ChallengeButton';

import './Challenge.css';

class Challenge extends Component {
    render(){
        return(
            <div className="playerChallenge flex-column">
                <div className="actionLog flex-column">
                    <h3 className="actionMessage">{(this.props.lastAction && this.props.lastAction.message ? this.props.lastAction.message : "")}</h3>
                    <h3 className="actionMessage">{(this.props.lastAction && this.props.lastAction.secondMessage ? this.props.lastAction.secondMessage : "")}</h3>
                </div>
                <div className="challengeButtonDiv flex-column">
                    <ChallengeButton active={ this.props.lastAction && this.props.lastAction.canChallenge &&
                        this.props.player !== this.props.lastAction.player && !this.props.player.isOut}/>
                </div>
            </div>
        )
    }
}

export default Challenge;