const ForumPost = require('../models/ForumPost')

exports.createPost = async (db, username, content, image) => {
    const result = await db.collection('forumPosts').insertOne(new ForumPost({
        username,
        content,
        image,
    }));
    return result.insertId;
}

exports.getPosts = async (db) => {
    return await db.collection('forumPosts').find().sort({ createdAt: -1 }).toArray(); // Sort by creation time (descending)
};