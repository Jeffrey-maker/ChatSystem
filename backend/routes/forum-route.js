const express = require('express');
const multer = require('multer');
const forumController = require('../controllers/forum-controllers');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads');
    },
    filename:function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/post', upload.single('image'), forumController.createPost);

router.get('/get', forumController.getPost);

module.exports = router;