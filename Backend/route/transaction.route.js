import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Schema
const transactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  from: String,
  to: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Create Transaction
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

// Get All Transactions
router.get("/", async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json(data);
});

export default router;