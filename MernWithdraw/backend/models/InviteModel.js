const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    sharedWith: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    dataId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Team model (or your target model)
        ref: 'Team', // Replace with your actual target model
    },
    token: {
        type: String, // This should be a unique token generated for the invite
    },
    // Add any other fields you need
});

const InviteModel = mongoose.model('Invite', inviteSchema);

module.exports = { InviteModel };
