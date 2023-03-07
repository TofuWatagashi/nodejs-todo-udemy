const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
// const { options } = require("nodemon/lib/config");
require("dotenv").config();

// dotenv.config({ path: "config.env" });
app.use(express.json());
app.use(express.static("./public"));

const PORT = 5000;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

const start = async () => {
  try {
    // console.log(process.env.MOONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(
      process.env.POPT || PORT,
      console.log("サーバーが起動しました。")
    );
  } catch (err) {
    console.log(err);
  }
};

start();
