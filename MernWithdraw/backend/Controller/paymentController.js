const asyncHandler = require("express-async-handler");
const { paymentModel } = require("../models/PaymentModel");
const CloudUploadImage = require("../utils/Cloudinary");


// ad data payment here







const createPayment = asyncHandler(async (req, res) => {
    const localPath = `public/images/${req.file.filename}`;
    let imgUpload = await CloudUploadImage(localPath);
    try {
        const newPayment = await paymentModel.create({
            trxid: req.body.trxid,
            sender: req.body.sender,
            images: [
                {
                    public_id: imgUpload?.id,
                    url: imgUpload?.url
                }
            ],
            user: req.body.user
        })

        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
})

// get all payment 

const getAllPayment = asyncHandler(async (req, res) => {
    try {
        const payments = await paymentModel.find().populate("user","-password")
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching payments.' });
    }
})

// get payment id here
const getPaymentId = asyncHandler(async (req, res) => {
    try {
        const payment = await paymentModel.findById(req.params.id).populate("user");
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the payment.' });
    }
})

// update payment 
const updatePayment = asyncHandler(async (req, res) => {
    try {
        const payment = await paymentModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated payment
        });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the payment.' });
    }
})

// delete payment

const deletePayment = asyncHandler(async (req, res) => {
    try {
        const payment = await paymentModel.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the payment.' });
    }
})



// upload cloudniary images





module.exports = { createPayment, getAllPayment, getPaymentId, updatePayment, deletePayment }