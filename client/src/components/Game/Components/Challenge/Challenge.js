import React, { Component } from 'react';

class Challenge extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonClass: "challengeButton " + (this.props.canChallenge ? "active" : "inactive")
        }
    }

    render(){
        return (
            <input type="button" className={ this.state.buttonClass } value="Challenge!" />
        )
    }
}

export default Challenge;