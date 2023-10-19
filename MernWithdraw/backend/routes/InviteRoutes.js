const express = require("express");
const { Invite,AcceptInvite } = require("../Controller/InviteController");
const { authMiddleware } = require("../middleware/authmiddleware");
// const { paymentModel } = require("../models/PaymentModel");
const router = express.Router();



router.post(`/generate-invite`, authMiddleware, Invite);
router.post(`/accept-invite/:inviteToken`,AcceptInvite)








module.exports = router