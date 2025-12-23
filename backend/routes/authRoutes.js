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
router.get("/getUser", protect, getUserInfo);
router.put("/updateUser", protect, updateUser);
router.delete("/deleteUser", protect, deleteUser);

module.exports = router;
