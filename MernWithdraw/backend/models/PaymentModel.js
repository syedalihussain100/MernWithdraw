const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
    trxid: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: Number,
        required: true
    },
    images: [
        {
            public_id: String,
            url: String,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
    {
        timestamps: true,
    }
)




const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = { paymentModel };






// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const sharp = require('sharp');
// const cloudinary = require('./cloudinaryConfig');

// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Middleware to resize and format uploaded images
// const resizeImage = async (req, res, next) => {
//     if (!req.file) return next();

//     const resizedImageBuffer = await sharp(req.file.buffer)
//         .resize(250, 250)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toBuffer();

//     req.file.buffer = resizedImageBuffer;
//     next();
// };

// // Routes
// app.post('/upload', upload.single('photo'), resizeImage, async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const uploadedImage = await cloudinary.uploader.upload_stream({
//             resource_type: 'auto'
//         }, (error, result) => {
//             if (error) {
//                 console.error('Error uploading image to Cloudinary:', error);
//                 return res.status(500).json({ error: 'Error uploading image' });
//             }

//             // Create a payment record with the Cloudinary image data
//             const payment = new Payment({
//                 trxid: req.body.trxid,
//                 sender: req.body.sender,
//                 images: [
//                     {
//                         public_id: result.public_id,
//                         url: result.secure_url
//                     }
//                 ],
//                 user: req.body.userId // Make sure this references your User model
//             });

//             payment.save()
//                 .then(() => {
//                     res.status(200).json({ message: 'Image uploaded and payment record created' });
//                 })
//                 .catch(saveError => {
//                     console.error('Error saving payment record:', saveError);
//                     res.status(500).json({ error: 'Error creating payment record' });
//                 });
//         });

//         // Pipe the uploaded image buffer to the Cloudinary stream
//         uploadedImage.end(req.file.buffer);
//     } catch (error) {
//         console.error('Error in upload route:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
