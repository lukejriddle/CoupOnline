import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './JoinLobby.css';
import socket from '../../../Socket';

class JoinLobby extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: "",
            buttonClass: "roomButton btnDisabled",
            inputClass: "roomCode"
        }
        
    }

    close = e => {
        if(e.target.getAttribute('class') === 'modalRoot flex-row'){
            this.props.onClose && this.props.onClose(e);
        }
    }

    tryJoin = e => {
        var self = this;
        socket.emit('tryJoin', 
        self.state.roomCode, 
        function(callback) {
            if(callback == 'err'){
                console.log('Failed to join lobby.');
                self.updateInput();
            } else {
                self.joinLobby();
            }
        });
    }

    joinLobby = e => {
        var self = this;
        socket.emit('joinLobby',
        { roomCode: self.state.roomCode, username: self.props.username }, 
        function(callback) {
            console.log(callback);
            if(callback != 'err'){
                document.title = "Coup Online - " + self.state.roomCode;
                self.props.history.push('/lobby');
                
            }
        });
    }

    updateInput = () => {
        this.setState({ inputClass: "roomCode err" });
    }

    updateRoomCode = e => {
        this.setState({ roomCode: e.target.value }, this.updateButton);
    }

    updateButton = () => {
        if(this.state.roomCode !== ''){
            this.setState({ buttonClass: "roomButton" });
        } else {
            this.setState({ buttonClass: "roomButton btnDisabled" });
        }
    }

    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div className="modalRoot flex-row" onClick={ this.close }>
                <div className="modalWrapper flex-column">
                    <div className="modalHeader flex-row">
                        <span className="modalTitle">Join Lobby</span>
                    </div>
                    <div className="joinLobby flex-column">
                    <h2 className="roomCodeTitle">Room Code</h2>
                        <input onChange={ this.updateRoomCode } className={ this.state.inputClass } spellCheck={false} id="joinCode" autoComplete="off" autoFocus={ true }></input>
                        <div className="joinRoomButtons flex-row">
                            <input type="button" onClick={ this.tryJoin } className={ this.state.buttonClass } value="Join" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(JoinLobby);