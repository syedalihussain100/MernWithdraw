const {UserModel} = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");



// Authentication

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, "abcdefghijklmnopqrstuvwxyaz");
          const user = await UserModel.findById(decoded?.id);
          req.user = user;
          console.log(user);
          next();
        }
      } catch (error) {
        throw new Error("Not Authorized token expired, Please Login Again");
      }
    } else {
      throw new Error("There is no token attached to header");
    }
  });


  const isAdmin = asyncHandler(async (req, res,next) => {
    const { email } = req?.user;
    const adminUser = await UserModel.findOne({ email });
  
    if (adminUser.role !== "admin") {
      throw new Error("You are not admin ");
    } else {
      next();
    }
  });


  // superadmin
  const isSuperUser = asyncHandler(async (req, res,next) => {
    const { email } = req?.user;
    const superUser = await UserModel.findOne({ email });
  
    if (superUser.superrole !== "superadmin") {
      res.status(400).send("You are not Super User ");
    } else {
      next();
    }
  });



  module.exports = {authMiddleware,isAdmin,isSuperUser}