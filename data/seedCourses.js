// seedCourses.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 */
const mongoose = require("mongoose"),
  Course = require("../models/Course");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/ut-nodejs", {
  useNewUrlParser: true,
});

mongoose.connection;

var courses = [
  {
    _id: "nodejs101",
    title: "Node.js 101",
    description: "웹 개발로 알아보는 백엔드 자바스크립트의 이해",
    price: 20000,
    courseImg:
      "",
  },
  {
    _id: "htmlcssjs101",
    title: "HTML, CSS, JS 101",
    description: "웹 개발의 시작은 여기서부터",
    price: 10000,
    courseImg:
      "",
  },
  {
    _id: "python101",
    title: "Python 101",
    description: "파이썬 기초 문법을 배워봅시다",
    price: 10000,
    courseImg:
      "",
  },
  {
    _id: "aiml101",
    title: "AI + ML 101",
    description: "인공지능과 머신러닝의 기초를 배워봅시다",
    price: 30000,
    courseImg:
      "",
  },
  {
    _id: "react101",
    title: "React 101",
    description: "리액트를 배워봅시다",
    price: 15000,
    courseImg:
      "",
  },
];

var commands = [];

// 1. Delete all previous data. / 이전 데이터 모두 삭제
// 2. Set a timeout to allow the database to be cleared. / 데이터베이스가 지워지는 것을 기다리기 위해 타임아웃 설정
// 3. Create a promise for each courses object. / 코스 객체마다 프라미스 생성.
// 4. Use Promise.all() to wait for all promises to resolve. / 모든 프라미스가 해결될 때까지 기다리기 위해 Promise.all() 사용.
// 5. Close the connection to the database. / 데이터베이스 연결 닫기.

Course.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} course records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  courses.forEach((c) => {
    commands.push(
      Course.create({
        _id: c._id,
        title: c.title,
        description: c.description,
        price: c.price,
        courseImg: c.courseImg,
      }).then((course) => {
        console.log(`Created course: ${course.title}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 500);
