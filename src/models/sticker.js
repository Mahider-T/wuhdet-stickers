const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        enum : ["Comedy", "Music", "Quotes", "Artist", "Books", "Trending", "Religion"],
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sticker', stickerSchema )