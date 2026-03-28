const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Create transaction
router.post("/create", async (req, res) => {
  try {
    const { amount, from, to, type } = req.body;

    const newTransaction = new Transaction({
      amount,
      from,
      to,
      type,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction saved",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json(data);
});

module.exports = router;