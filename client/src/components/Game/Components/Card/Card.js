import React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc: './../../../img/facedown.png'
        }
    }

    componentDidUpdate = () => {
        if(this.props.card.faceUp){
            this.setState({ imgSrc: './../../../img/card' + this.props.card.value });
        } else {
            this.setState({ imgSrc: './../../../img/facedown.png' });
        }
    }

    render(){
        return (
            <img className="cardImage" src={ this.state.imgSrc } />
        )
    }
}

export default Card;