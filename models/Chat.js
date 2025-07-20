const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    prompt: String,
    response: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
