import React, { Component } from 'react';
import { parse } from 'flatted';

import PlayerSide from './Components/PlayerSide/PlayerSide';
import OpponentSide from './Components/OpponentSide/OpponentSide';
import socket from '../../Socket';
import { getUpdate } from './SocketHandler';
import { setUpBoard, arrange } from '../../util/Helper'

import './Game.css'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: undefined,
            deck: undefined,
            turn: undefined,
            opponents: [],
            hasUpdate: false
        }
    }

    componentDidMount = () => {
        this.listen();
        this.getUpdate();
        setInterval(this.getUpdate, 2500);
    }

    listen = () => {
        var self = this;
        socket.on('gameUpdate', function(payload){
            payload = parse(payload);
            let res = arrange(payload.player, payload.game.players);
            self.setState({
                player: payload.player,
                opponents: setUpBoard(res),
                deck: payload.game.deck,
                turn: payload.game.turn
            });
            
            if(!self.state.hasUpdate){
                self.setState({ hasUpdate: true });
            }  
        })

        socket.on('requireUpdate', function(payload){
            self.getUpdate();
        })
    }

    getUpdate = () => {
        getUpdate();
    }
    
    render(){
        if(this.state.hasUpdate){
            return(
                <div className="gameContent flex-column">
                    <OpponentSide opponents={ this.state.opponents } deck={ this.state.deck } />
                    <PlayerSide player={ this.state.player } turn={ this.state.turn }
                        opponents={ this.state.opponents } />
                </div>
            )
        } else {
            return(
                <div className="err"/>
            )
        }
    }

}

export default Game;    