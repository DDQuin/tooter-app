const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  
}, { timestamps: true });

module.exports = mongoose.model("Toot", schema);
