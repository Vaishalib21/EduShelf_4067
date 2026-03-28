import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios"; // ✅ added

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // ✅ UPDATED FORM SUBMIT (connected to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setSuccess(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4001/api/contact",
        formData
      );

      if (res.data) {
        setSuccess(true);
        setError("");
        setFormData({ name: "", email: "", message: "" });
      }

    } catch (err) {
      setError("Something went wrong. Try again.");
      setSuccess(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-16 max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Contact <span className="text-pink-500">Us</span>
        </h1>

        <p className="text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
          Have questions, suggestions, or need help? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-pink-500">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Feel free to contact us anytime.
            </p>
            <div className="mt-4">
              <p><strong>Email:</strong> bookstore@gmail.com</p>
              <p><strong>Phone:</strong> +91 9876XXXXXX</p>
              <p><strong>Address:</strong> XXXX, XX, India</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 border rounded-md outline-none dark:bg-slate-800"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border rounded-md outline-none dark:bg-slate-800"
                required
              />

              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 border rounded-md outline-none dark:bg-slate-800"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                Send Message
              </button>

              {/* ✅ Success Message */}
              {success && (
                <p className="mt-2 text-green-500 font-semibold text-center">
                  Message Sent! We'll get back to you soon.
                </p>
              )}

              {/* ❌ Error Message */}
              {error && (
                <p className="mt-2 text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;