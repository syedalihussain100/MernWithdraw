const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyaz", { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };