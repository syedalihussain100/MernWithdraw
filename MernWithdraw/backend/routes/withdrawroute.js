const express = require("express");
const { withDraw, TotalwithDraw } = require("../Controller/withdraw");
const router = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");



router.post(`/create-withdraw`, authMiddleware, withDraw);
router.get(`/total-withdraw`, authMiddleware, TotalwithDraw);


module.exports = router 