const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  platform: {
    type: String,
    required: true,
  },
  dsn: {
    type: String,
    required: true,
  },
  sourceMap: {
    type: Object,
  },
  bundledSource: {
    type: Object,
  },
  alarm: {
    type: Boolean,
  },
  alaramSettings: {
    alarmType: {
      type: String,
      enum: ["Email", "Slack"],
    },
    alarmNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  error: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  performance: [Object],
});

module.exports = mongoose.model("Project", projectSchema);
