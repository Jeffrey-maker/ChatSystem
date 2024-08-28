const express = require('express');
const multer = require('multer');
const chatController = require('../controllers/chat-controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, './uploads/images');
        } else if (file.fieldname === 'file') {
            cb(null, './uploads/files');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/post', upload.single('file'), upload.single('image'), chatController.createMessage);

router.get('/get', chatController.getMessage);

module.exports = router;