import React, { Component } from 'react';
import facedown from './../../../../img/facedown.png';

import './Card.css';

class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
            facedown: facedown,
            images: {
                1: require('./../../../../img/card1.png'),
                2: require('./../../../../img/card2.png'),
                3: require('./../../../../img/card3.png'),
                4: require('./../../../../img/card4.png'),
                5: require('./../../../../img/card5.png')
            },
            isSelected: false,
        }
    }

    componentDidUpdate = () => {
        if(this.state.isSelected && this.props.numSelected == 0){
            this.setState({isSelected: false});
        }
    }

    handleClick = () => {
        if(this.props.isPlayer && this.props.isPlayersTurn){
            if(this.props.availableActions.includes(-1)
                && !this.props.card.faceUp){
                    this.props.emitLoseInfluence(this.props.card.value);
                }
            else if(this.props.availableActions.includes(-2)
                && !this.props.card.faceUp){
                    this.toggleSelected();
                }
        } 
    }

    toggleSelected = () => {
        if(!this.state.isSelected){
            this.setState({ isSelected: true });
            this.props.select(this.props.card.value);
        } else {
            this.setState({ isSelected: false });
            this.props.deselect(this.props.card.value);
        }
    }

    render(){
        return (
            <img className={"cardImage " + ((this.props.card.faceUp || this.state.isSelected)
                && this.props.isPlayer ? "lost" : "")} 
            src={ this.props.card.faceUp || this.props.isPlayer ? this.state.images[this.props.card.value] : this.state.facedown } 
            onClick={this.handleClick}/>
        )
    }
}

export default Card;