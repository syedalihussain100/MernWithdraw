const express = require("express");
const { getteam } = require("../Controller/TeamController");
const { authMiddleware } = require("../middleware/authmiddleware");
// const { paymentModel } = require("../models/PaymentModel");
const router = express.Router();



router.get(`/allteam`, authMiddleware, getteam);



module.exports = router