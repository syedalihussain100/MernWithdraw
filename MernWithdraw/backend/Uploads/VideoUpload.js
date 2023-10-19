const multer = require("multer");
const path = require("path");

// Storage for video files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/videos"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extname = path.extname(file.originalname);
        cb(null, `video-${uniqueSuffix}${extname}`);
    },
});

// File type checking
const multerFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    } else {
        // Rejected files
        cb(
            {
                message: "Unsupported file format",
            },
            false
        );
    }
};

const videoUpload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 100000000 }, // 100 MB limit (adjust as needed)
});

module.exports = { videoUpload };
