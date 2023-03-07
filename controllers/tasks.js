//スキーマをインストール
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  //   res.send("タスクを全部取得しました");
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTask = async (req, res) => {
  //   res.send("タスクを新規作成しました");
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleTask = async (req, res) => {
  //   res.send("ある特定のタスクを取得しました。");
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id });

    if (!getSingleTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(getSingleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  //   res.send("ある特定のタスクを更新しました。");
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  //   res.send("ある特定のタスクを削除しました。");
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
