import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import LobbyList from './LobbyList/LobbyList'
import './Lobby.css';
import socket from '../../Socket';

class Lobby extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: document.title.split('-')[1],
            players: [],
            buttonClass: "readyButton",
            isReady: false
        }
    }

    componentDidMount = () => {
        this.getPlayers();

        var self = this;
        socket.on('updatePlayers', function(data){
            self.updatePlayers(data);
        })
        socket.on('gameStarted', function(data){
            self.props.history.push('/game');
        })
    }

    getPlayers = () => {
        var self = this;
        socket.emit('getPlayers', '', function(callback) {
            self.updatePlayers(callback);
        });
    }

    updatePlayers = (playerList) => {
        this.setState({ players: playerList });
    }

    toggleReady = (e) => {
        e.preventDefault();

        let res = !this.state.isReady;
        this.setState({ isReady: res });

        socket.emit('toggleReady', '', function(callback){
            if(callback !== 'success'){
                console.log(callback);
            }
        });
    }

    render(){
        return(
            <div className="lobby outerWrapper flex-row">
                <div className="lobby innerWrapper flex-column">
                    <div className="lobby header flex-row">
                        <h1>{ this.state.roomCode }</h1>
                    </div>
                    <div className="lobby contentWrapper flex-column">
                        <div className="lobbyPlayers">
                            <h2>Current Players ({ this.state.players.length }/6)</h2>
                            <LobbyList players={ this.state.players } />
                        </div>
                    </div>
                    <div className="lobby buttonsWrapper flex-column">
                        <input type="button" onClick={ this.toggleReady } 
                            className={ this.state.buttonClass + " " + (this.state.players.length === 1 ? "btnDisabled" : "") + " " + (this.state.isReady ? "active" : "") } value="Ready" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Lobby);