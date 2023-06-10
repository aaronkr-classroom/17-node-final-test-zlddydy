// models/Paper.js
"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  paperSchema = new Schema({
    title: "Handwritten Hangul Grapheme Generation Using an ACGAN",
    subtitle: "", // Korean title OK
    authors: ["A.Snowberger", "C.H.Lee"],
    meta: {
      abstractOneLine: "",
      abstract: "",
      abstractAlt: "", // Korean abstract OK
      keywords: "",
    },
    published: {
      date: "May 2023",
      location: "Proceedings of the 2023 Spring Academic Conference",
      organization: "KIICE",
      event: "",
      pages: "",
    },
    links: {
      code: "",
      slides: "",
      paper: "",
    },
    paperImg: "",
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

module.exports = mongoose.model("Paper", paperSchema);
