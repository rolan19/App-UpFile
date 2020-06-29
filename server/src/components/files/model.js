const { Schema, model } = require("mongoose");

const fileModel = new Schema(
  {
    title: String,
    file: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Files", fileModel);
