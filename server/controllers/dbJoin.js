var ObjectId = require('mongoose').Types.ObjectId; 

var Game = require('../models/Games');
var Player = require('../models/Games');

function dbJoin(req, res) {

    Game.findOne( { room_name : req.body.params.roomName }, function (err, game) {
        if (err) { console.log(err); }
        // if found, send problem
        if (game) {

            var player = new Player();

            console.log("making player");

            player.game = game;
            player.creator = false;
            player.name = req.body.params.playerName;
            player.points = 0;
            player.words = [];

            game.num_players++;
            game.players.push(player);

            player.save(function (err, player) {
                console.log("saved a new player");
                if(err){ return next(err); }
                game.save(function(err, game){
                    console.log("udpated agame");
                    if(err){ return next(err); }

                    res.send({gameObject: game, playerObject: player});
                });

            });    

        } else {
            res.send({found: false});
            console.log('Game not found')
        }
    });


   
};

module.exports = dbJoin;

