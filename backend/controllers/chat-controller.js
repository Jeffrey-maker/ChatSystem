const chatService = require('../services/chat-service')

exports.createMessage = async (req, res) => {
    try {
        const { userId, senderId, receriverId, content } = req.body
        const db = req.app.locals.db; // Get the MongoDB database instance

        // Handle image upload
        const image = req.files?.image ? `/uploads/images/${req.files.image[0].filename}` : null;

        // Handle file upload
        const file = req.files?.file ? `/uploads/files/${req.files.file[0].filename}` : null;

        postId = await chatService.createMessage(db, senderId, receriverId, content, file, image);

        res.status(200).json({ message: "Message send successfully", postId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getMessage = async (req, res) => {
    try {
        const { userId1, userId2 } = req.query;
        const db = req.app.locals.db;
        const messages = await chatService.getMessage(db, userId1, userId2);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}