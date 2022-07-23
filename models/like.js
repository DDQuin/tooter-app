const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    toot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toot",
    },

}, { timestamps: true });

module.exports = mongoose.model("Like", schema);
