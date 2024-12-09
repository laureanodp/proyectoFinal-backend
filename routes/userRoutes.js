const express = require("express");
const { getProfile, getUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getProfile);
router.get("/", protect, getUsers);

module.exports = router;
