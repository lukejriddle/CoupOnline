import React, { Component } from 'react';

import './ChallengeButton.css';
import { emitChallenge } from '../../../../../SocketHandler';

class ChallengeButton extends Component {
    emitChallenge = () => {
        emitChallenge();
    }

    render(){
        return(
            <input type="button" className={ "challengeButton " + (this.props.active ? "active" : "inactive") }
                onClick={ this.emitChallenge } value="Challenge"/>
        )
    }
}

export default ChallengeButton;