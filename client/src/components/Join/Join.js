import React, { Component } from 'react';

import './Join.css';

import CreateLobby from '../CreateLobby/CreateLobby';
import JoinLobby from '../JoinLobby/JoinLobby';

class Join extends Component{
    constructor(props){
        super(props);
        this.state = { 
            showCreate: false,
            showJoin: false, 
            username: '',
            buttonClass: 'joinButton btnDisabled'
        };
    }
    

    toggleCreate = () => {
        this.setState({ showCreate: !this.state.showCreate });
    }
    toggleJoin = () => {
        this.setState({ showJoin: !this.state.showJoin });
    }
    
    updateUsername = e => {
        this.setState({ username: e.target.value }, this.updateButtonClass);
    }

    updateButtonClass = () => {
        if(this.state.username !== ''){
            this.setState({ buttonClass: "joinButton" });
        } else {
            this.setState({ buttonClass: "joinButton btnDisabled" });
        }
    }

    render(){
        return(
            <div className="join outerWrapper flex-row">
                <div className="join innerWrapper flex-column">
                    <div className="join header flex-row">
                        <h1>Coup Online</h1>
                    </div>
                    <div className="joinUsernameWrapper flex-column">
                        <h3 id="yourUsername">Your name</h3>
                        <input autoFocus={true} onChange={ this.updateUsername } type="text" className="usernameInput"/>
                    </div>
                    <div className="joinButtonsWrapper flex-row">
                        <input type="button" className= { this.state.buttonClass } value="Join Lobby" onClick={ this.toggleJoin }/>
                        <input type="button" className= { this.state.buttonClass } value="Create Lobby" onClick={ this.toggleCreate }/>
                    </div>
                </div>
                <CreateLobby username={ this.state.username } onClose={ this.toggleCreate } show={ this.state.showCreate }/>
                <JoinLobby username={ this.state.username } onClose={ this.toggleJoin } show={ this.state.showJoin }/>
            </div>
        );
    }
}

export default Join;