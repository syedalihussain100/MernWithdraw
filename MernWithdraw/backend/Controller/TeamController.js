const expressAsyncHandler = require("express-async-handler");
const {TeamModel} = require("../models/TeamModel");



const getteam = expressAsyncHandler(async (req, res) => {
    try {
        const data = await TeamModel.find().populate("userId")
        res.status(200).send({ message: "All Videos", data });
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports = {getteam}