import React, { Component } from 'react';

import Card from '../../../../Card/Card';
import { emitExchange, emitLoseInfluence } from '../../../../../SocketHandler';

import './PlayerCards.css';

class PlayerCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            numSelected: 0,
            selected: []
        }
    }

    select = (val) => {
        this.state.selected.push(val);
        this.setState({ numSelected: ++this.state.numSelected});
        if(this.state.numSelected == 2){
            try{
                this.emitExchange(this.state.selected);
                this.setState({numSelected: 0, selected: [] });
            } catch(e) {
                console.log('Emit exchange failed. Player.js#select\n' + e);
            }
        }
    }

    deselect = (val) => {
        let index = this.state.selected.findIndex(element => element == val);
        this.state.selected.splice(index, 1);
        this.setState({ numSelected: --this.state.numSelected})
    }

    emitExchange = (vals) => {
        emitExchange(vals);
    }

    emitLoseInfluence = (val) => {
        emitLoseInfluence(val);
    }

    render(){
        return(
            <div className="contentDivCenter flex-row">
                {
                    Object.keys(this.props.player.cards).map((key) => {
                        return (
                            <Card isPlayer={true} isPlayersTurn={ this.props.turn.activePlayer == this.props.player }
                            availableActions={ this.props.turn.availableActions }
                            key={ key } card={ this.props.player.cards[key] }
                            emitLoseInfluence={ this.emitLoseInfluence }
                            select={this.select} deselect={this.deselect}
                            numSelected={this.state.numSelected}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default PlayerCards;