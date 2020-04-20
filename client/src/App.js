import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Join from './components/Join/Join';
import Lobby from './components/Lobby/Lobby';
import Game from './components/Game/Game'
import socket from './Socket';
import cookies from './util/CookieManager';
import './App.css';


class App extends Component{
    componentDidMount = () => {
        console.log('mounted');
        var uid = cookies.get('UID');
        if(!uid){
            uid = Math.random().toString(36).slice(2);
            cookies.set('UID', uid);
        }

        var self = this;
        socket.emit('checkUID', uid, function(callback){
            if(callback !== 'notPlaying'){
                document.title = "Coup Online - " + callback;
                self.props.history.push('/');
                self.props.history.push('/lobby');
            }
        });
    }

    render(){
        return(
            <div className="content">
                <Route exact path="/" component={Join}/>
                <Route path="/lobby" component={Lobby}/>
                <Route path="/game" component={Game}/>
            </div>
        );
    }
}

export default withRouter(App);
