const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authmiddleware");
const { createVideo, getVideos, getVideoId, VideodeleteId } = require("../Controller/videoController");
const { videoUpload } = require("../Uploads/VideoUpload");
const router = express.Router();






router.post(`/upload`, authMiddleware, isAdmin, videoUpload.single("video"), createVideo);
router.get(`/get-videos`, authMiddleware, getVideos);
router.get(`/get-video/:id`, authMiddleware, getVideoId);
router.delete(`/delete-video/:id`, authMiddleware, isAdmin, VideodeleteId);




module.exports = router


