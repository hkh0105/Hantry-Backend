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
  alaramSettings: {
    type: Boolean,
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  error: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Error",
    },
  ],
  performance: [Object],
});

module.exports = mongoose.model("Project", projectSchema);
