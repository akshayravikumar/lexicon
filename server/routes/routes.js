var express = require('express');
var router = express.Router();
var path = require('path');

// DATABASE
// var mongoose = require('mongoose');
// var dbConfig = require('../config/database');
// mongoose.connect(dbConfig.uri);

// CONTROLLERS
// general
var returnIndex = require('../controllers/returnIndex');

// var dbGame = require('../controllers/dbGame');
// var dbNew = require('../controllers/dbNew');
// var dbJoin = require('../controllers/dbJoin');


/***** PAGES HANDLED CLIENT SIDE *****/
// landing page
router.get('/', returnIndex);
// signup page
router.get('/game/*', returnIndex);
// login page

// router.get('/db/game', dbGame);

// router.post('/db/new', dbNew);
// router.post('/db/join', dbJoin);

/***** ERROR HANDLING *****/
// 404
router.all('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/views/404.html'));
});


module.exports = router;