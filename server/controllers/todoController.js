const Todo = require("../models/Todo");

// GET USER TODOS
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADD TODO
exports.addTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      userId: req.user.id,
      task: req.body.task
    });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// TOGGLE TODO
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};