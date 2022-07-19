const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    reqiured: true,
  },
  toots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Toot',
    },
  ],
});

module.exports = mongoose.model("User", schema);
