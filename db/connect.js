const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("データベースと接続中・・・"))
    .catch((err) => console.log(err));

  //thenは非同期処理
};

module.exports = connectDB;
