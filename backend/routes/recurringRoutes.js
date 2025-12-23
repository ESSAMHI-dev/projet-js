const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createRecurring,
    getRecurring,
    getRecurringById,
    updateRecurring,
    deleteRecurring
} = require("../controllers/recurringController");

router.post("/", protect, createRecurring);
router.get("/", protect, getRecurring);
router.get("/:id", protect, getRecurringById);
router.put("/:id", protect, updateRecurring);
router.delete("/:id", protect, deleteRecurring);

module.exports = router;
