const express = require("express");
const {
    addIncome,
    getAllIncome,
    getIncome,
    updateIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.get("/:id", protect, getIncome);
router.put("/:id", protect, updateIncome);
router.delete("/:id", protect, deleteIncome);

module.exports = router;