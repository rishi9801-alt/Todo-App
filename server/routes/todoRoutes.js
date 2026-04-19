const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getTodos);
router.post("/",auth, addTodo);
router.delete("/:id",auth, deleteTodo);
router.put("/:id",auth, updateTodo);

module.exports = router;