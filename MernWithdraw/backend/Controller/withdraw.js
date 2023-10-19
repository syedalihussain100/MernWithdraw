const expressAsyncHandler = require("express-async-handler");
const { WithdrawModel } = require("../models/WithdrawModel");
const { UserModel } = require("../models/UserModel");



const withDraw = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user
    try {
        const newdata = await WithdrawModel.create({
            accountNumber: req.body.accountNumber,
            amountTitle: req.body.amountTitle,
            amount: req.body.amount,
            accounttype: req.body.accounttype
        })

        const updatewallet = await UserModel.findByIdAndUpdate(_id, {
            wallet: 0
        })

        await updatewallet.save();

        res.status(200).send("Your Withdraw has been submited")
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });

    }
})

// total withdraw

const TotalwithDraw = expressAsyncHandler(async (req, res) => {
    try {
        const data = await WithdrawModel.find()

        res.status(200).send(data);
      
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });

    }
})



module.exports = { withDraw, TotalwithDraw }