const { ObjectId } = require('mongodb');

exports.addContact = async (db, userId, contactId) => {
    const existingContact = await db.collection("contacts").findOne({
        userId: new ObjectId(userId),
        contactId: new ObjectId(contactId)
    });

    if (existingContact) {
        throw new Error('Contact already exists');
    }

    const result = await db.collection('contacts').insertOne({
        userId: new ObjectId(userId),
        contactId: new ObjectId(contactId),
        createdAt: new Date()
    });

    return result.insertedId;
}

exports.deleteContact = async (db, userId, contactId) => {
    const existingContact = await db.collection("contacts").findOne({
        userId: new ObjectId(userId),
        contactId: new ObjectId(contactId)
    });

    if (!existingContact) {
        throw new Error('Contact does not exist');
    }

    const result = await db.collection('contacts').deleteOne({
        userId: ObjectId(userId),
        contactId: ObjectId(contactId)
    });

    return result.deletedCount; // Returns the number of deleted documents (should be 1 if successful)
}