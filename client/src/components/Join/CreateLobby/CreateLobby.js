import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'react-router-dom';

import './CreateLobby.css';
import socket from '../../../Socket';


class CreateLobby extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: "",
            codeId: "",
            hasId: false
        }
    }

    close = e => {
        if(e.target.getAttribute('class') === 'modalRoot flex-row'){
            this.props.onClose && this.props.onClose(e);
        }
    }

    updateCodeId = () => {
        this.setState({ codeId: "copiedHighlight"} );
    }

    componentDidUpdate = () =>{
        if(this.state.hasId === true) return;
        var self = this;
        socket.emit('getRoomCode', '', function(name){
            self.setState({ roomCode: name });
        })
        this.setState({ hasId: true });
    }

    createLobby = () => {
        var self = this;
        socket.emit('createLobby', this.state.roomCode, function(callback){
            if(callback !== 'err'){
                socket.emit('joinLobby', 
                { roomCode: self.state.roomCode, username: self.props.username }, 
                function(callback) {

                    if(callback === 'err'){
                        console.log('Failed to join lobby.');
                    } else {
                        document.title = "Coup Online - " + self.state.roomCode;
                        self.props.history.push('/lobby');
                    }
                });
            }
        });
    }

    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div className="modalRoot flex-row" onClick={ this.close }>
                <div className="modalWrapper flex-column">
                    <div className="modalHeader flex-row">
                        <span className="modalTitle">Create Lobby</span>
                    </div>
                    <div className="createLobby flex-column">
                        <h2 className="roomCodeTitle">Room Code</h2>
                        <div className="roomCode flex-column" id={ this.state.codeId }>{ this.state.roomCode } </div>
                        <div className="createRoomButtons flex-row">
                            <CopyToClipboard text={ this.state.roomCode } onCopy={ this.updateCodeId }>
                                <input type="button" className="roomButton" value="Copy" />
                            </CopyToClipboard>
                            <input type="button" onClick={ this.createLobby } className="roomButton" value="Start"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateLobby);