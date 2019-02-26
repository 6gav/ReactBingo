import React, { Component } from 'react';
import {Sleep} from './Utility.js';

class Game extends Component {

    state ={
        gameId: null,
    }

    constructor(props){
        super(props);

        this.GetGameInfo = this.GetGameInfo.bind(this);
    }
    
    componentDidMount(){
        var gameId = parseInt(this.props.match.params.id);

        this.setState({gameId: gameId});
        this.GetGameInfo(gameId);
    }

    GetGameInfo(id){
        
        fetch('/api/GetGameInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({gameId: id}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
    }

    render() {
        return (
            <div>
                <p>Game id: {this.state.gameId}</p>
            </div>
        );
    }
}

export default Game;