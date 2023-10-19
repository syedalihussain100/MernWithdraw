const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video: [
        {
            public_id: String,
            url: String,
        },
    ],
}, {
    timestamps: true
});




const VideoModel = mongoose.model("Video", videoSchema);

module.exports = { VideoModel }