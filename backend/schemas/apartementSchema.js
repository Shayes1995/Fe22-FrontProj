const mongoose = require('mongoose');

const apartementSchema = mongoose.Schema ({
  title: {type: String, required: true},
  available: {type: String, required: true},
  description: {type: String, required: true},
  imgURL: [{
    name: { type: String, required: true }, 
    url: { type: String, required: true },
  }],
  period: {type: String, required: true},
  unitType: {type: String, required: true},
  area: {type: String, required: true},
  floor: {type: String, required: true},
  rent: {type: String, required: true},
  rooms: {type: String, required: true},
  size: {type: String, required: true},
  city: {type: String, required: true},
  street: {type: String, required: true},
  zipcode: {type: String, required: true},
  apply: {type: String, required: true},
  includes: [{
    name: { type: String, required: true }
  }],
  status: { type: Boolean, required: true, default: true },

})

module.exports = mongoose.model('Apartement', apartementSchema);