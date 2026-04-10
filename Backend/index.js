import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import transactionRoute from "./route/transaction.route.js";
import contactRoute from "./route/contact.route.js";

// Load env FIRST
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// PORT
const PORT = process.env.PORT || 4001;

// MongoDB URI (FIXED NAME)
const URI = process.env.MONGO_URI;

// ✅ MongoDB Connection
mongoose.connect(URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((error) => {
    console.log("❌ MongoDB Error:", error);
  });

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api", contactRoute);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});