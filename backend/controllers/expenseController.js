const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//Add expense source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    // Validation: check if source and amount are provided

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date : new Date(date),
    });
    await newExpense.save();
    return res.status(200).json(newExpense);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get all expense sources
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get single expense
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Check ownership
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to access this expense" });
    }

    return res.status(200).json({ success: true, data: expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Delete expense source
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    // Check ownership
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this expense" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Download expense data as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    // Prepare data for excel
    const data = expenses.map((items) => ({
      Category: items.category,
      Amount: items.amount,
      Date: items.date.toString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    xlsx.writeFile(wb, "Expense_details.xlsx");

    return res.download("Expense_details.xlsx");
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
