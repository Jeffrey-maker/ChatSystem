

exports.createPost = async (db, userId, username, content, image) => {
    const result = await db.collection('forumPosts').insertOne({
        userId,
        username,
        content,
        image,
        createdAt: new Date()
    });
    return result.insertedId;
}

exports.getPosts = async (db) => {
    return await db.collection('forumPosts').find().sort({ createdAt: -1 }).toArray(); // Sort by creation time (descending)
};