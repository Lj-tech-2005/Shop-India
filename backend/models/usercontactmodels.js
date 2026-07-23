const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  country: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactMessage', contactSchema);
