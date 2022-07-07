const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  dsn: {
    type: String,
    required: true,
  },
  breadcrumbs: {
    type: Boolean,
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
