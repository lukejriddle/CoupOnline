import React, { Component } from 'react';

import './LobbyPlayer.css';

class LobbyPlayer extends Component {

    render(){
        return (
            <li className={"lobbyPlayerItem " + (this.props.isReady ? 'ready' : '')}>{ this.props.name }</li>
        )
    }
}

export default LobbyPlayer;