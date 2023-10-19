const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
    },
    amountTitle: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    accounttype: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const WithdrawModel = mongoose.model('Withdraw', withdrawSchema);

module.exports = { WithdrawModel };
