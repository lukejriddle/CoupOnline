import React, { Component } from 'react';

import coin from './../../../../img/coin.png'

import './Coin.css';

class Coin extends Component {
    render(){
        return (
            <img className="coinImage" src={ coin } />
        )
    }
}

export default Coin;