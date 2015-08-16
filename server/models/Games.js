var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  public: Boolean,
  started: Boolean,
  last_move: Date,
  creation_time: Date,
  password: String,
  number_turns: Number,
  room_name : String,
  pile : [String],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  max_players : Number,
  num_players : Number
});

module.exports = mongoose.model('Game', GameSchema);