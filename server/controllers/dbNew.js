var ObjectId = require('mongoose').Types.ObjectId; 

var Game = require('../models/Games');
var Player = require('../models/Player');

function dbNew(req, res) {

    var game = new Game();

    console.log(req);
 
    game.max_players = req.body.params.max_players;
    game.public = req.body.params.public;
    game.creation_time = Date.now();
    game.last_move = Date.now();

    game.password = req.body.params.password;
    game.room_name = req.body.params.roomname;
    game.started = false;
    game.num_players = 1;

    var letters = "AAAAAAAAAAAAABBBCCCDDDDDDEEEEEEEEEEEEEEEEEEFFFGGGGHHHIIIIIIIIIIIIJJKKLLLLLMMMNNNNNNNNOOOOOOOOOOOPPPQQRRRRRRRRRSSSSSSTTTTTTTTTUUUUUUVVVWWWXXYYYZZ"
    
    var letterArr = [];

    for (var i = 0; i < letters.length; i++) {
        letterArr.push(letters[i]);
    }

    game.pile = letterArr;
 
    var player = new Player();

    console.log("making player");

    player.game = game;
    player.creator = true;
    player.name = req.body.params.player_name;
    player.points = 0;
    player.words = [];

    console.log("made player");

    game.players = [player];

    console.log("gonna save player");

    player.save(function (err, player) {
        console.log("saved a new player");
        if(err){ return next(err); }
        game.save(function(err, game){
            console.log("saved a new game");
            if(err){ return next(err); }

            res.send({gameObject: game, playerObject: player});
        });

    });    

};

module.exports = dbNew;

