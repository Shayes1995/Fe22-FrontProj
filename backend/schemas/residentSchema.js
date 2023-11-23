const mongoose = require('mongoose');

const residentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  apartement: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartement', required: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resident', residentSchema);
