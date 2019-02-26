import React, {Component} from 'react';
import './Home.css';


class Home extends Component{
    state = {
        card: null,
        userId: null,
        gameId: null,
        gameError: null,
    }

    constructor(props){
        super(props);

        this.GetUser = this.GetUser.bind(this);
        this.SearchForGame = this.SearchForGame.bind(this);
        this.StartGame = this.StartGame.bind(this);
    }


    componentDidMount(){
        var userId = localStorage.getItem('userId');
        if(!localStorage.getItem('userId'))
        {
            this.GetUser();
        }
        else
        {
            this.setState({userId: userId});
        }
    }

    SearchForGame(e){
        e.preventDefault();

        fetch('/api/JoinGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({gameId: this.state.gameId}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.errorCode === 404){
                this.setState({gameError: response.error});
                return;
            }
            else if (response.errorCode === 0){
                this.setState({gameError: 'Joining...'});
                window.location = '/game/' + this.state.gameId;
            }
        });
    }

    GetUser(){
        fetch('/api/getUserId')
        .then(response => response.json())
        .then(response => {
            console.log(response);

            localStorage.setItem('userId', response.id);
            this.setState({userId: response.id});
        });
    }

    StartGame(e){
        console.log('Starting game...');

        fetch('/api/StartGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({userId: this.state.userId}),
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            if(response.statusCode === 0){
               window.location = '/game/' + response.gameId; 
            }
        });
    }
    
    render(){
        return (
            <div>
                <h1>User id: {this.state.userId}</h1>
                <form onSubmit={this.SearchForGame}>
                    <input type="text" placeholder="Game Id" onChange={e => this.setState({gameId: e.target.value}) }/>
                    <input type="submit"/>
                </form>
                <p>{this.state.gameError}</p>

                <button onClick={this.StartGame}>Create game</button>
            </div>
        );
    }
}

export default Home;