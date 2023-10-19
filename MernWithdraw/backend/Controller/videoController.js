const expressAsyncHandler = require("express-async-handler");
const { VideoModel } = require("../models/videoModel");
// const path = require("path");
const CloudUploadVideo = require("../utils/cloudinaryVideo");


// create video

const createVideo = expressAsyncHandler(async (req, res) => {

    const localPath = `public/videos/${req.file.filename}`;
    let videoUpload = await CloudUploadVideo(localPath);
    try {
        const newvideo = await VideoModel.create({
            video: [
                {
                    public_id: videoUpload?.id,
                    url: videoUpload?.url
                }
            ],
        })

        res.status(201).json(newvideo)
    } catch (error) {
        res.status(500).send(error.message);
    }

})

// video list

const getVideos = expressAsyncHandler(async (req, res) => {
    try {
        const data = await VideoModel.find();
        res.status(200).send({ message: "All Videos", data });
    } catch (error) {
        res.status(400).send(error)
    }
})


// get video id
const getVideoId = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await VideoModel.findById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error)
    }
})

// video delete here
const VideodeleteId = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await VideoModel.findByIdAndDelete(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error)
    }
})





module.exports = { createVideo, getVideos, getVideoId, VideodeleteId }