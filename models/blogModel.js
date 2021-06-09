const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    category:
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
