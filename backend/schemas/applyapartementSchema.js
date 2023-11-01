const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartement', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: 'pending' }
});

module.exports = mongoose.model('Application', applicationSchema);
