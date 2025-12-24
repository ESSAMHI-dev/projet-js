const Factures = require("../models/Factures");

//Add new Facture
exports.AddFacture = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, amount, dueDate, status } = req.body;

    if (!title || !amount || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title, Amount and Due Date are required" });
    }
    const newFacture = new Factures({
      userId,
      title,
      amount,
      dueDate: new Date(dueDate),
      status,
    });
    await newFacture.save();
    return res.status(200).json(newFacture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get all Factures
exports.getAllFactures = async (req, res) => {
  const userId = req.user.id;
  try {
    const factures = await Factures.find({ userId }).sort({ dueDate: -1 });
    return res.status(200).json(factures);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get single Facture
exports.getFacture = async (req, res) => {
  try {
    const facture = await Factures.findById(req.params.id);
    if (!facture) {
      return res
        .status(404)
        .json({ success: false, message: "Facture not found" });
    }
    return res.status(200).json(facture);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Update Facture
exports.UpdateFacture = async (req, res) => {
  try {
    const facture = await Factures.findById(req.params.id);
    if (!facture) {
      return res
        .status(404)
        .json({ success: false, message: "Facture not found" });
    }
    const { title, amount, dueDate, status } = req.body;
    facture.title = title || facture.title;
    facture.amount = amount || facture.amount;
    facture.dueDate = dueDate ? new Date(dueDate) : facture.dueDate;
    facture.status = status || facture.status;
    await facture.save();
    return res.status(200).json(facture);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Delete Facture
exports.DeleteFacture = async (req, res) => {
  try {
    const facture = await Factures.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Facture deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};