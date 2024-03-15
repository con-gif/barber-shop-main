const mongoose = require('mongoose');

const barbershopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  professionals: [{ type: String }],
  adminUsername: { type: String, required: true },

});

const Barbershop = mongoose.model('Barbershop', barbershopSchema);

module.exports = Barbershop;