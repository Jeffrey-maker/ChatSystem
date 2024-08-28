const forumService = require('../services/forum-service');

exports.createPost = async (req, res) => {
    try {
        const { userId, username, content } = req.body;
        const image = req.file?.image? `/uploads/images/${req.files.image[0].filename}` : null;
        const db = req.app.locals.db; // Get the MongoDB database instance

        const postId = await forumService.createPost(db, userId, username, content, image)
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
        res.status(500).json({ error: error.message });
    }
}