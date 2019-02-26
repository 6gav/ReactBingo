const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io');
io = io.listen(server);


//Game directory
var GameList = {};


//Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.set('port', (process.env.PORT || 5000));


//Socket commands
io.on('connection', (client) => {
    console.log('Client connected: ');
    console.log(client.id)
    client.emit('acceptConnection', {message: 'Accepted'})
});

io.on('disconnect', (client) => {
    console.log('Client disconnected: ');
    console.log(client);
});


//REST APIs

app.get('/api/getUserId', (req, res) => {
    var userId = Math.trunc(Math.random() * 100);
    res.send({id: userId});
});

app.post('/api/JoinGame', (req, res) => {
    var gameId = req.body.gameId;
    if(!GameList[gameId]){
        console.log(gameId + " does not exist!");
        res.send({error: 'Game does not exist', errorCode: 404});
    }
    else{
        console.log(GameList[gameId]);
        res.send({error: 'Accepted', errorCode: 0});
    }

});

app.post('/api/StartGame', (req, res) => {

    var gameId;
    do{
        gameId = Math.floor(Math.random() * 10);
    }while(GameList[gameId])

    GameList[gameId] = {Host: req.body.userId, PlayerList: []};
    GameList[gameId].PlayerList.push({userId: req.body.userId});

    console.log('Game with id ' + gameId + ' hosted by ' + req.body.userId + ' started.');
    res.send({statusCode: 0, gameId: gameId});

});


app.post('/api/GetGameInfo', (req, res) => {
    console.log(req.body);
    console.log(GameList[req.body.gameId]);
    res.send({PlayerList: GameList[req.body.gameId].PlayerList});
});


//End REST



//Render
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//Listen
server.listen(app.get('port'), function() {
    console.log('App is listening on port: ' + app.get('port'));
});