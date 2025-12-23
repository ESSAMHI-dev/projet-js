const express = require("express");

const {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  updateUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/deleteUser", protect, deleteUser);
router.put("/updateUser", protect, updateUser);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
