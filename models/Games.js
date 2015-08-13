var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  public: Boolean,
  started: Boolean,
  last_move: Date,
  creation_time: Date,
  password: String.
  number_turns: Number,
  room_name : String,
  word_pile : [String],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

mongoose.model('Game', GameSchema);