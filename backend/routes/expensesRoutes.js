const express = require("express");
const {
    addExpense,
    getAllExpense,
    getExpense,
    updateExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.get("/:id", protect, getExpense);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;