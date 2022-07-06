const { OAuth2Client } = require("google-auth-library");
const asyncCatcher = require("../utils/asyncCatcher");

const verifyGoogle = asyncCatcher(async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  req.user = payload;

  next();
});

module.exports = {
  verifyGoogle,
};
