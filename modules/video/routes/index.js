const express = require('express');
const multer = require('multer');
const videoController = require('../controllers/videoController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', upload.fields([{ name: 'videoFile', maxCount: 1 }, { name: 'imgFile', maxCount: 1 }]), videoController.createVideo);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
