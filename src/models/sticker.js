const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        enum : ["Comedy", "Music", "Quote", "Celebrity", "Book", "Tech", "Religion"],
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sticker', stickerSchema )