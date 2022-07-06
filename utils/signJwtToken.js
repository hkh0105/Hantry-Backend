const jwt = require("jsonwebtoken");

const signJwtToken = user => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = { signJwtToken };
