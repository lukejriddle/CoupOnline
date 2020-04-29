import React, { Component } from 'react';

import ActionButton from './ActionButton/ActionButton';
import { emitAction } from '../../../../SocketHandler';

import './ActionList.css';

class ActionList extends Component {
    constructor(props){
        super(props);
        this.actions = {
            1: "Income",
            2: "Foreign Aid",
            3: "Tax",
            4: "Coup",
            5: "Assassinate",
            6: "Exchange",
            7: "Steal",
            8: "Block Assassination",
            9: "Block Steal",
            10: "Block Foregin Aid",
            11: "Allow"
        }

        this.emitFunctions = {
            
        }
    }

    emitAction = (val, target, card) => {
        emitAction(val, target, card);
    }

    render(){
        if(this.props.player == this.props.turn.activePlayer) {
            return (
                <div className="actions flex-row">
                    {
                        Object.values(this.props.turn.availableActions).map((key) => {
                            return (
                                <ActionButton emitAction={ this.emitAction } key={ key } id={ key } value={ this.actions[key] } opponents={ this.props.opponents } />
                            )
                        })
                    }
                </div>
            )
        } else if(this.props.turn.availableActions.includes(10) && this.props.player != this.props.turn.lastAction.player) {
            return (
                <div className="actions flex-row">
                    <ActionButton emitAction={ this.props.emitAction } key={ 10 } id={ 10 } value={ this.actions[10] } opponents={ this.props.opponents } />
                </div>
            )
        }  else {
            return (
                <div className="actions flex-row"/>
            )
        }
    }
}

export default ActionList;