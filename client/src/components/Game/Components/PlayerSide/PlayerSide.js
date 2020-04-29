import React, { Component } from 'react';

import Player from './Player/Player';

import './PlayerSide.css';

class PlayerSide extends Component {
    render(){
        return(
            <div className="playerSide">
                <Player player={ this.props.player } turn={ this.props.turn }
                opponents={ this.props.opponents } />
            </div>
        )
    }
}

export default PlayerSide;