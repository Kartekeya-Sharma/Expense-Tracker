const express = require("express");
const auth = require("../middleware/auth");
const {
  getTransactions, //controller functions
  addTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", auth, getTransactions);
router.post("/", auth, addTransaction);
router.delete("/:id", auth, deleteTransaction);

module.exports = router;
