// data/seedTrains.js
"use strict";

const mongoose = require("mongoose"),
  Train = require("../models/Train");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/aaronkr", {
  useNewUrlParser: true,
});

mongoose.connection;

var trains = [
  {
    title: "KTX",
    description: "Our top-class, number-one, fastest, most awesomest train.",
    button: "Experience the <em>Thrill~</em>",
    trainImg:
      "https://cdn.pixabay.com/photo/2019/10/04/12/05/train-4525444_960_720.jpg",
    modalText: "",
  },
  {
    title: "ITX",
    description: "Our second fastest train. Red as flame, nearly as hot.",
    button: "Experience the <em>Passion~</em>",
    trainImg:
      "https://cdn.pixabay.com/photo/2020/12/24/05/24/korea-5856548_960_720.jpg",
    modalText: "",
  },
  {
    title: "무궁화",
    description: "Slightly slower, but still gets you there.",
    button: "Experience the <em>Calm~</em>",
    trainImg:
      "https://cdn.pixabay.com/photo/2020/04/28/03/16/korea-5102455_960_720.jpg",
    modalText: "",
  },
];

var commands = [];

// 1. Delete all previous data. / 이전 데이터 모두 삭제
// 2. Set a timeout to allow the database to be cleared. / 데이터베이스가 지워지는 것을 기다리기 위해 타임아웃 설정
// 3. Create a promise for each courses object. / 코스 객체마다 프라미스 생성.
// 4. Use Promise.all() to wait for all promises to resolve. / 모든 프라미스가 해결될 때까지 기다리기 위해 Promise.all() 사용.
// 5. Close the connection to the database. / 데이터베이스 연결 닫기.

Train.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} train records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  trains.forEach((t) => {
    commands.push(
      Train.create({
        title: t.title,
        description: t.description,
        button: t.button,
        trainImg: t.trainImg,
      }).then((train) => {
        console.log(`Created train: ${train.title}`);
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
