const mongoose = require("mongoose");

const slackUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dsn: {
    type: String,
  },
  token: {
    type: String,
  },
  channelId: {
    type: String,
  },
});

module.exports = mongoose.model("SlackUser", slackUserSchema);
