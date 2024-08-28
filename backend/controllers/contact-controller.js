const contactService = require("../services/contact-service")

exports.addContact = async (req, res) => {
    try {
        const { userId, contactId } = req.body;
        const db = req.app.locals.db;

        const postId = contactService.addContact(db, userId, contactId);

        res.status(200).json({ message: "Contact added successfully", postId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const {userId, contactId} = req.bodyconst;
        db = req.app.locals.db;

        const deletedCount = await contactService.deleteContact(db, userId, contactId);

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}