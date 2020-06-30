const { Schema, model } = require("mongoose");

const fileModel = new Schema(
  {
    title: { type: String },
    file: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Files", fileModel);
