// models/Course.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema(
    {
      title: {
        // 강좌 스키마에 속성 추가
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      maxStudents: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative number of students"],
      },
      cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"],
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Course", courseSchema);
