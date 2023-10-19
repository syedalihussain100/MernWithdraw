const cloudinary = require("cloudinary").v2;


const CloudUploadVideo = async (fileToUpload) => {
  try {
    const options = {
      resource_type: "video", // Specify that you're uploading a video
      folder: "videos", // Optional: specify a folder in your Cloudinary account
    };

    const data = await cloudinary.uploader.upload(fileToUpload, options);

    return {
      url: data?.secure_url,
    };
  } catch (error) {
    return error;
  }
};

module.exports = CloudUploadVideo;
