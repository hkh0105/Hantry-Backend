const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  message: {
    type: String,
  },
  user: {
    os: {
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
  },

  source: {
    type: String,
  },
  location: {
    lineno: String,
    colno: String,
  },

  stack: [Object],
  breadcrumbsURL: [String],
  breadcrumbsClick: [String],
  createdAt: Date,
  project: String,
});

module.exports = mongoose.model("Error", errorSchema);
