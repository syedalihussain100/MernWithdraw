const expressAsyncHandler = require("express-async-handler");
const { InviteModel } = require("../models/InviteModel");
const { UserModel } = require("../models/UserModel");
const { TeamModel } = require("../models/TeamModel");


const Invite = expressAsyncHandler(async (req, res) => {
    
    const sharedBy = req.user._id; // Assuming you have user authentication

    try {
        // Create a unique invite token
        const inviteToken = generateUniqueToken();

        // Store the invite in your database
        const invite = new InviteModel({ sharedBy, token: inviteToken });
        await invite.save();

        // Get the username of the user who is inviting
        const sharedByUsername = await UserModel.findById(sharedBy, 'username');

        // Construct the invite link
        const inviteLink = `http://localhost:3000/accept-invite/${inviteToken}`;

        // Send a message to the user
        const message = `Hello, ${sharedByUsername.username} has invited you to join. Click here to register: ${inviteLink}`;

        // You can send the message through email, SMS, or any other messaging service
        // For simplicity, we'll respond with the message in the API response
        res.status(200).json({ message: 'Invite generated successfully', inviteLink, message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


function generateUniqueToken() {
    // For simplicity, we'll return a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000).toString();
}



// accept invite


const AcceptInvite = expressAsyncHandler(async (req, res) => {
    const { inviteToken } = req.params;

    try {
      // Find the invite by token
      const invite = await InviteModel.findOne({ token: inviteToken });
  
      if (!invite) {
        return res.status(404).json({ message: 'Invite not found.' });
      }
  
      if (invite.sharedWith) {
        return res.status(400).json({ message: 'Invite has already been accepted.' });
      }
  
      let user = null;
  
      // Check if the user is already registered
      // If the user is not registered, create a new user account
      if (!user) {
        user = await createUser(req); // Implement this function
      }
  
      invite.sharedWith = user._id;
      await invite.save();
  
      let teamData = null;
  
      if (invite.dataId) {
        teamData = await TeamModel.findById(invite.dataId);
      }
  
      // Save data in the new model if needed
      const newData = new TeamModel({ userId: user._id, /* other data */ });
      await newData.save();
  
      res.status(200).json({ message: 'Invite accepted successfully', userData: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
})


// Assuming you have a UserModel and it has fields like 'username' and 'email'

// Assuming you have a UserModel and it has fields like 'username' and 'email'
async function createUser(req) {
    const { username, email, phone, password } = req.body; // You may need to adjust this based on your request data

    try {
        // Check if a user with the provided email already exists
        let user = await UserModel.findOne({ email });

        if (user) {
            // If a user with the same email exists, you can handle this case accordingly
            // For simplicity, we'll return the existing user
            return user;
        }

        // Create a new user using the UserModel
        user = new UserModel({
            username,
            email,
            phone,
            password
            // Add other fields and data as needed
        });

        // Save the new user to the database
        await user.save();

        // Return the newly created user
        return user;
    } catch (error) {
        throw error;
    }
}






module.exports = { Invite, AcceptInvite }