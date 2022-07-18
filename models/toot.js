const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
});

module.exports = mongoose.model("Toot", schema);
