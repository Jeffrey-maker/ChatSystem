const express = require('express');
const contactController = require('../controllers/contact-controller');
const router = express.Router();

router.post('/add', contactController.addContact);
router.delete('/delete', contactController.deleteContact);

module.exports = router;