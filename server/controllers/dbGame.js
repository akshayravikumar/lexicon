var ObjectId = require('mongoose').Types.ObjectId; 
var Game = require('../models/Games');

function dbGame(req, res) {

    console.log("trying to find game");
    console.log(req.query);
    console.log(req.body);
    // find problem with given ID and populate tags so that tag texts are sent
    Game.findOne( { room_name : req.query.name }, function (err, game) {
        if (err) { console.log(err); }
        // if found, send problem
        if (game) {
            res.send({found: true, gameObject: game});
        } else {
            res.send({found: false});
            console.log('Game not found')
        }
    });
};

module.exports = dbGame;