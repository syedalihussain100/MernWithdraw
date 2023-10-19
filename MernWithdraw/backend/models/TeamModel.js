const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, change 'User' to your actual user model name
    required: true,
  },
});

const TeamModel = mongoose.model('Team', teamSchema);

module.exports = { TeamModel };
