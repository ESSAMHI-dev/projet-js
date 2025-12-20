const xlsx = require("xlsx");
const Income = require("../models/Income");

//Add income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    // Validation: check if source and amount are provided

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date : new Date(date),
    });
    await newIncome.save();
    return res.status(200).json(newIncome);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get all income sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    return res.status(200).json(incomes);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Delete income source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Download income data as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for excel
    const data = incomes.map((items) => ({
      Source: items.source,
      Amount: items.amount,
      Date: items.date.toString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "Income_details.xlsx");

    return res.download("Income_details.xlsx");
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
