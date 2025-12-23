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

//Get single income
exports.getIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    
    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    // Check ownership
    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to access this income" });
    }

    return res.status(200).json({ success: true, data: income });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Delete income source
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }

    // Check ownership
    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this income" });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Update income source
exports.updateIncome = async(req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ success: false, message: "Income not found" });
    }
    
    // Check ownership
    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to update this income" });
    }
    
    const { icon, source, amount, date } = req.body;
    
    income.icon = icon;
    income.source = source;
    income.amount = amount;
    income.date = new Date(date);
    await income.save();
    return res.status(200).json({ success: true, data: income });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

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
