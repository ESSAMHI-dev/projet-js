const mongoose = require("mongoose");

const IncomeSchenma = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
  },
  source: {
    type: String,
    required: true,
  }, //Example like salary, business, freelancing etc
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    Default: Date.now,
  },
},{timestamps: true});

module.exports = mongoose.model("Income", IncomeSchenma);
