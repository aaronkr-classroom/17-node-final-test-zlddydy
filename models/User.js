// models/User.js
"use strict";

// [노트] 이 라인은 사용자 모델의 등록 전에 위치해야 한다.
const passportLocalMongoose = require("passport-local-mongoose"); // passport-local-mongoose를 요청
const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = Schema(
    // 사용자 스키마 생성
    {
      name: {
        first: {
          type: String,
          trim: true,
        },
        last: {
          type: String,
          trim: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      profileImg: {
        type: String,
        trim: true,
      },
      discussions: [{ type: Schema.Types.ObjectId, ref: "Discussion" }],
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    {
      timestamps: true, // timestamps 속성을 추가해 createdAt 및 updatedAt 시간 기록
    }
  );

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // 이메일 주소를 사용자 이름으로 사용
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
}); // 사용자의 풀 네임을 얻기 위한 가상 속성 추가

module.exports = mongoose.model("User", userSchema);
