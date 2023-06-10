// models/Train.js
"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  trainSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    button: {
      type: String,
    },
    trainImg: {
      type: String,
    },
    modalText: {
      type: [String],
    },
  });

module.exports = mongoose.model("Train", trainSchema);
