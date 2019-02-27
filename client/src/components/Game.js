import React, { Component } from 'react';
import './Game.css';

class Game extends Component {

    state ={
        gameId: null,
        userId: null,
    }

    constructor(props){
        super(props);

        this.GetGameInfo = this.GetGameInfo.bind(this);
    }
    
    componentDidMount(){
        var gameId = parseInt(this.props.match.params.id);

        var userId = localStorage.getItem('userId');

        this.setState({gameId: gameId, userId: userId});
        this.GetGameInfo(gameId, userId);
    }

    GetGameInfo(gameId, userId){
        fetch('/api/GetGameInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({gameId: gameId}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({playerList: response.PlayerList});
        });

        fetch('/api/GetGameBoard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({userId: userId, gameId: gameId}),
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
                <PlayerList list={this.state.playerList}/>
            </div>
        );
    }
}

function PlayerList(props){
    var listItem = null;
    
    if(!props.list){
        return listItem;
    }

    var listOfUsers = [];

    for(var i = 0; i < props.list.length; i++){
        listOfUsers.push(<p key={i}>{props.list[0].userId}</p>);
    }

    return (<ul className='User-List'>
    <h3>Player list: </h3>
    {listOfUsers}
    </ul>);
}

export default Game;