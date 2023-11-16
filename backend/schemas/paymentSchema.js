const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);


