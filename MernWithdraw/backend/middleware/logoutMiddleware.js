const expressAsyncHandler = require("express-async-handler");

const logoutMiddleware = expressAsyncHandler(async (req, res, next) => {
    // Clear the relevant cookies and session data here
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    // Optionally, clear the accessToken cookie if needed
  
    // Perform any additional logout actions, such as invalidating tokens in the database
    
    // Continue to the next middleware or route
    next();
  });
  


  module.exports = {logoutMiddleware}