const Transaction = require("../models/Transaction");

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    console.log("Fetching categories...");
    // Get unique categories from transactions
    const categories = await Transaction.distinct("category", {
      type: "expense",
    });
    console.log(`Found ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// Add new transaction
const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction); //201 - created
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, error: "Transaction not found" });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getTransactions,
  getCategories,
  addTransaction,
  deleteTransaction,
};
