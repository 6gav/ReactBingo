import React, { Component } from 'react';
import './Game.css';

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
            this.setState({playerList: response.PlayerList});
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
        return null;
    }

    console.log(props.list);

    var listOfUsers = [];

    for(var i = 0; i < props.list.length; i++){
        listOfUsers.push(<p key={i}>{props.list[0].userId}</p>);
    }

    return <ul className='User-List'>{listOfUsers}</ul>;
}

export default Game;