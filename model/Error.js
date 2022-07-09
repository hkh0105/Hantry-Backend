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
  browser: {
    type: String,
  },
  engine: {
    type: String,
  },
  ua: {
    type: String,
  },
  cpu: {
    type: String,
  },
  source: {
    type: String,
  },
  location: {
    lineno: String,
    colno: String,
  },
  stack: [Object],
  breadcrumbs: [String],

  project: {
    type: String,
  },
});

module.exports = mongoose.model("Error", errorSchema);
