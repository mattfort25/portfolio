// server/controllers/subscriberController.js
const NewsletterSubscriber = require("../models/NewsletterSubscriber");

exports.subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingSubscriber = await NewsletterSubscriber.findOne({
      where: { email },
    });

    if (existingSubscriber) {
      return res.status(200).json({
        success: true,
        message: "Email already subscribed. Thank you!",
      });
    }

    const newSubscriber = await NewsletterSubscriber.create({ email });

    res.status(201).json({
      success: true,
      message: "Tthank for your interest, we will contact you shortly.",
      subscriber: { id: newSubscriber.id, email: newSubscriber.email },
    });
  } catch (error) {
    console.error("Error saving newsletter subscriber:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "This email address is already subscribed." });
    }
    res.status(500).json({
      message: "Internal server error. Failed to process subscription.",
    });
  }
};
