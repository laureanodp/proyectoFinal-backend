const express = require("express");
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);

module.exports = router;
