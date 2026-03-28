<file>d</file>import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [method, setMethod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePayment = async () => {
    if (!method) {
      setError("Please select a payment method");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:4001/api/transaction/create", {
        amount: book.price,
        from: "You",
        to: "BookStore",
        type: "debit",
        method,
      });

      setSuccess(`Payment Successful via ${method} ✅`);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.log(err);
    }
  };

  if (!book) {
    return (
      <h1 className="text-center mt-10 text-black dark:text-white">
        Select a course first
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">

      {/* Main Container */}
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-black dark:text-white">
            Checkout
          </h1>
          <button className="text-black dark:text-white" onClick={() => navigate(-1)}>
            ✖
          </button>
        </div>

        {/* Book Info */}
        <div className="flex gap-3 items-center mb-4">
          <img
            src={book.image}
            alt={book.name}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-semibold text-black dark:text-white">
              {book.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {book.title}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 dark:text-gray-300">Total</span>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            ₹{book.price}
          </span>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
            Payment Method
          </h2>

          {[
            {
              name: "UPI",
              icon: "https://cdn-icons-png.flaticon.com/512/825/825454.png",
            },
            {
              name: "Google Pay",
              icon: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
            },
            {
              name: "Paytm",
              icon: "https://cdn-icons-png.flaticon.com/512/825/825423.png",
            },
            {
              name: "Card",
              icon: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
            },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setMethod(item.name);
                setError("");
              }}
              className={`flex items-center justify-between p-3 mb-2 rounded-xl cursor-pointer transition ${
                method === item.name
                  ? "bg-blue-50 dark:bg-slate-700 border border-blue-500"
                  : "bg-gray-50 dark:bg-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={item.icon} className="w-6 h-6" />
                <span className="text-sm text-black dark:text-white">
                  {item.name}
                </span>
              </div>

              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  method === item.name
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-green-600 dark:text-green-400 text-sm mt-2 text-center">
            {success}
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-4 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Pay ₹{book.price}
        </button>

      </div>
    </div>
  );
}

export default Payment;