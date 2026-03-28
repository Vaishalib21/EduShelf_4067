<file>d</file>import Contact from "../model/contact.model.js";

export const saveContact = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, email, message } = req.body;

    // ✅ Email validation (backend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const newContact = new Contact({ name, email, message });

    await newContact.save();

    res.status(201).json({
      message: "Message saved successfully",
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};