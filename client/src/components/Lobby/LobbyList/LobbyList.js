import React, { Component } from 'react';

import LobbyPlayer from '../LobbyPlayer/LobbyPlayer';
import './LobbyList.css';

class LobbyList extends Component {

    render(){
        console.log('list render');
        return(
            <ul className="lobbyList">
                {
                    Object.keys(this.props.players).map((key) => {
                        return (
                            <LobbyPlayer key={ key } name={ this.props.players[key].name } isReady={ this.props.players[key].isReady } />
                        )
                    })
                }
            </ul>
        )
    }


}

export default LobbyList;