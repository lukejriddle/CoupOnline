import React, { Component } from 'react';

import Card from '../../Card/Card';
import Coin from '../../Coin/Coin';

import "./Opponent.css"

class Opponent extends Component {
    render(){
        if(this.props.player){
            return (
                <div className="gameOpp flex-column">
                    <div className="oppHeader flex-row">
                        {this.props.player.name}
                    </div>
                    <div className="oppItems flex-row">
                        <div className="contentDiv" />
                        <div className="contentDivCenter flex-row">
                            {
                                Object.keys(this.props.player.cards).map((key) => {
                                    return (
                                        <Card className="playerCard" key={ key } card={ this.props.player.cards[key] }/>
                                    )
                                })
                            }
                        </div>
                        <div className="contentDiv flex-row">
                            <Coin className="playerCoin" />
                            <h2>x { this.props.player.coins }</h2>
                        </div>
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