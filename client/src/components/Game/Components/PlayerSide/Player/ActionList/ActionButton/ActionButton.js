import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './ActionButton.css';

class ActionButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            popoverOpen: false
        }
    }

    onClickStd = (e) => {
        this.props.emitAction(this.props.id);
    }

    onClickTarget = (e) => {
        let tempOpponents = this.props.opponents.filter(element => element !== null);
        let opp = tempOpponents.find(element => element.id == e.target.value)
        if(opp){
            this.props.emitAction(this.props.id, opp.id);
        } else {
            console.log('[EXCEPTION] Could not find player. ::ActionButton.js#onClickTarget::');
        }
    }

    onClickCard = (e) => {
        this.props.emitAction(this.props.id, undefined, e.target.value);
    }

    popoverToggle = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }

    render(){
        if(this.props.id == 9){ //block steal, with what?
            return (
                <div className="actionButtonPopup">
                    <Button className="actionButton" id={"targetButton" + this.props.id} type="button">{ this.props.value }</Button>
                    <Popover hideArrow={false} trigger="legacy" placement="top" isOpen={ this.state.popoverOpen } target={"targetButton" + this.props.id}
                        toggle={this.popoverToggle}>
                        <PopoverHeader>Block with...</PopoverHeader>
                        <PopoverBody>
                            <div className="cardButtons flex-row">
                                <Button onClick={this.onClickCard} value={1} className="cardButton" >Ambassador</Button>
                                <Button onClick={this.onClickCard} value={3} className="cardButton" >Captain</Button>
                            </div>
                        </PopoverBody>
                    </Popover>
                </div>
            )
        } else if(this.props.id == 4 || this.props.id == 5 || this.props.id == 7){ //needs target
            return(
                <div className="actionButtonPopup">
                    <Button className="actionButton" id={"targetButton" + this.props.id} type="button">{ this.props.value }</Button>
                    <Popover trigger="legacy" placement="top" isOpen={ this.state.popoverOpen } target={"targetButton" + this.props.id}
                        toggle={this.popoverToggle}>
                        <PopoverHeader>Select a target</PopoverHeader>
                        <PopoverBody>
                            <div className="opponentButtons flex-row">
                                {
                                    Object.keys(this.props.opponents).map((key) => {
                                        if(this.props.opponents[key] !== null && !this.props.opponents[key].isOut){
                                            return(
                                                <Button onClick={this.onClickTarget} value={this.props.opponents[key].id} className="opponentButton" key={key} >{this.props.opponents[key].name}</Button>
                                            )
                                        }
                                        else return(<div/>);
                                    })
                                }
                            </div>
                        </PopoverBody>
                    </Popover>
                </div>
            )
        } else if(this.props.id == -1){
            return(
                <h3>Select a card to lose</h3>
            )
        } else if(this.props.id == -2){
            return(
                <h3>Select two cards to return to the deck.</h3>
            )
        } else {
            return(
                <input className="actionButton" type="button" value={ this.props.value }
                    onClick={ this.onClickStd }/>
            )
        }
    }
}

export default ActionButton;