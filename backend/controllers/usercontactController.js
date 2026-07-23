const ContactMessage = require('../models/usercontactmodels');

const contactController = {
  async submitMessage(req, res) {
    try {
      const {
        userId,
        firstName,
        lastName,
        email,
        phone,
        country,
        subject,
        message
      } = req.body;

      if (!userId || !firstName || !lastName || !email || !country || !message) {
        return res.send({ flag: 0, message: "Please fill all required fields" });
      }

      const newMessage = new ContactMessage({
        userId,
        firstName,
        lastName,
        email,
        phone,
        country,
        subject,
        message,
      });

      await newMessage.save();

      res.send({
        flag: 1,
        message: "Message submitted successfully. You will receive a reply within 7 working days.",
      });

    } catch (error) {
      console.error("submitMessage error:", error);
      res.send({ flag: 0, message: "Internal Server Error" });
    }
  },
};

module.exports = contactController;
