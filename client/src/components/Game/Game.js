import React, { Component } from 'react';

import Player from './Components/Player/Player';
import Deck from './Components/Deck/Deck';
import Opponent from './Components/Opponent/Opponent';
import socketHandler from './socket_handler';
import socket from '../../Socket';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: undefined,
            otherPlayers: [],
            deck: undefined,
            turn: undefined,
            opponents: [],
            isSetUp: false,
            hasUpdate: false
        }
        this.socketHandler = new socketHandler()
    }

    componentDidMount = () => {
        this.listen();
        this.socketHandler.getUpdate();
    }

    listen = () => {
        var self = this;
        socket.on('gameUpdate', function(payload){

            self.setState({
                player: payload.player,
                otherPlayers: self.arrange(payload.player, payload.otherPlayers),
                deck: payload.deck,
                turn: payload.turn
            });
            if(!self.state.isSetUp){
                self.setUpBoard();
            }
            if(!self.state.hasUpdate){
                self.setState({ hasUpdate: true })
            }
        })
    }

    /**
     * Arranges otherPlayers to be a list in turn order.
     * 
     * @param {Player} player
     * @param {List} otherPlayers - list of Players
     * @returns {List} arranged list
     */
    arrange = (player, otherPlayers) => {
        let index = otherPlayers.findIndex(element => element == player);
        let temp = otherPlayers.splice(index, otherPlayers.length - index);
        let res = temp.concat(otherPlayers);
        res.shift();
        return res;
    }

    getUpdate = () => {
        this.socketHandler.getUpdate();
    }

    emitAction = (val, target, card) => {
        this.socketHandler.emitAction(val, target, card)
    }

    emitChallenge = () => {
        this.socketHandler.emitChallenge();
    }

    emitLoseInfluence = (val) => {
        this.socketHandler.emitLoseInfluence(val);
    }

    emitExchange = (vals) => {
        this.socketHandler.emitExchange(vals);
    }

    setUpBoard = () => {
        let others = this.state.otherPlayers;
        switch(this.state.otherPlayers.length){
            case 1:
                this.state.opponents = [null, others[0], null, null, null];
                break;
            case 2:
                this.state.opponents = [null, others[1], null, others[0], null];
                break;
            case 3:
                this.state.opponents = [null, others[1], null, others[0], others[2]];
                break;
            case 4:
                this.state.opponents = [others[1], others[2], null, others[0], others[3]];
                break;
            case 5:
                this.state.opponents = [others[1], others[2], others[3], others[0], others[4]]
                break;
            default:
                console.log("[EXCEPTION] Game has too few/too many players. ::Game.js#setUpBoard::");    
        }
        this.setState({ isSetUp: true });
    }

    render(){
        if(this.state.hasUpdate){
            return(
                <div className="gameContent">
                    <div className="opponentSide">
                        <Opponent player={ this.state.opponents[0] } turn={ this.state.turn } />
                        <Opponent player={ this.state.opponents[1] } turn={ this.state.turn } />
                        <Opponent player={ this.state.opponents[2] } turn={ this.state.turn } />
                        <Opponent player={ this.state.opponents[3] } turn={ this.state.turn } />
                        <Deck deck={ this.state.deck } />
                        <Opponent player={ this.state.opponents[4] } turn={ this.state.turn } />
                    </div>
                    <div className="playerSide">
                        <Player player={ this.state.player } turn={ this.state.turn } />
                    </div>
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