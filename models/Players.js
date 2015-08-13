var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
 	game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    creator: Boolean,
    name: String,
    points : Number,
    words : [String]
});

mongoose.model('Player', PlayerSchema);