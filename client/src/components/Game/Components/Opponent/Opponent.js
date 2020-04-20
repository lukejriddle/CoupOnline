import React, { Component } from 'react';

import Card from '../Card/Card';
import Coin from '../Coin/Coin';

class Opponent extends Component {
    render(){
        if(this.props.player){
            return (
                <div className="gameOpp">
                    <div className="oppHeader">

                    </div>
                    <div className="oppItems">
                        {
                            Object.keys(this.props.player.cards).map((key) => {
                                return (
                                    <Card className="playerCard" card={ this.props.player.cards[key] }/>
                                )
                            })
                        }
                        <Coin className="playerCoin" />
                        <h2>{ this.props.player.coins }</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="gameOpp"></div>
            )
        }
    }
}

export default Opponent;