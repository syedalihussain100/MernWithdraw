const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "abcdefghijklmnopqrstuvwxyaz", { expiresIn: "1d" });
};

module.exports = { generateToken };