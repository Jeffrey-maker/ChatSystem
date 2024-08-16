const forumService = require('../services/forum-service');
const ForumPost = require('../models/ForumPost')

exports.createPost = async (req, res) => {
    try {
        const { username, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const db = req.app.locals.db; // Get the MongoDB database instance

        const postId = forumService.createPost(db, username, content, image)
        res.status(200).json({ message: "Post create successfully", postId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getPost = async (req, res) => {
    try {
        const db = req.app.locals.db;

        const posts = await forumService.getPosts(db);

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: error.message });
    }
}