import React, { Component } from 'react';

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
    }

    render(){
        return (
            <div className="actions">
                {
                    Object.values(this.props.list).map((val) => {
                        return (
                            <input type="button" value={ this.actions[val] } />
                        )
                    })
                }
            </div>
        )
    }
}

export default ActionList;