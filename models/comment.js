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
    toot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toot",
    },

}, { timestamps: true });

module.exports = mongoose.model("Comment", schema);
