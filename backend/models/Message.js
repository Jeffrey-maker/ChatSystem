const mongoose = require('mongoose');

const MessagePostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL or path to the image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessagePost', MessagePostSchema);