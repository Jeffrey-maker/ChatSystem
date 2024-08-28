exports.createMessage = async (db, senderId, receiverId, content, file, image) => {
    const result = await db.collection("message").insertOne({
        senderId,
        receiverId,
        content,
        file,
        image,
        createdAt: new Date()
    });
    return result.insertedId;
}

exports.getMessage = async (db, userId1, userId2) => {
    return await db.collection("message").find({
        $or: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
        ]
    }).sort({ createdAt: 1 }).toArray();
}