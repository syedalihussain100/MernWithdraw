const express = require("express");
const { createPayment,getAllPayment,getPaymentId } = require("../Controller/paymentController");
const { authMiddleware, isAdmin } = require("../middleware/authmiddleware");
// const { paymentModel } = require("../models/PaymentModel");
const router = express.Router();
// const multer = require("multer");
// const sharp = require("sharp");
const { profilePhotoUpload, profilePhotoResize } = require("../Uploads/ProfilePhotoUpload");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const cloudinary = require("cloudinary").v2;


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



// router.post('/upload', upload.single('photo'), resizeImage, async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         // Create a payment record with the Cloudinary image data
//         const paymentData = {
//             trxid: req.body.trxid,
//             images: [
//                 {
//                     public_id: '',
//                     url: ''
//                 }
//             ],
//             user: req.body.userId // Make sure this references your User model
//         };

//         // Upload the image to Cloudinary
//         const uploadedImage = await cloudinary.uploader.upload_stream({
//             resource_type: 'auto'
//         }, async (error, result) => {
//             if (error) {
//                 console.error('Error uploading image to Cloudinary:', error);
//                 return res.status(500).json({ error: 'Error uploading image' });
//             }

//             // Update the paymentData with the Cloudinary image data
//             paymentData.images[0].public_id = result.public_id;
//             paymentData.images[0].url = result.secure_url;

//             // Create a payment record
//             const payment = new paymentModel(paymentData);

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






// create payment

router.post(`/createpayment`, authMiddleware, profilePhotoUpload.single("image"), profilePhotoResize, createPayment);

// create all payment

router.get(`/alldata`,authMiddleware,isAdmin,getAllPayment)
router.get(`/:id`,authMiddleware,isAdmin,getPaymentId)






module.exports = router;


