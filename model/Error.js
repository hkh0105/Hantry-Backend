const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  message: {
    type: String,
  },
  os: {
    type: String,
  },
  device: {
    type: String,
  },
  url: {
    type: String,
  },
  browser: {
    type: String,
  },
  app: {
    type: String,
  },
  location: {
    file: String,
    line: String,
  },
  breadcrumbs: [String],

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

module.exports = mongoose.model("Error", errorSchema);
