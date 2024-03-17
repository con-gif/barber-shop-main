const mongoose = require('mongoose');

const barbershopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String }, // Optional website field
  street: { type: String, required: function() { return !this.hasNoAddress; } }, // Conditional requirement
  professionals: [{ type: String }],
  adminUsername: { type: String, required: true },
  services: [{ type: String }], // Array of services
  teamSize: { type: Number, required: true },
  hasNoAddress: { type: Boolean, default: false }, // Flag for businesses without a physical address
});

const Barbershop = mongoose.model('Barbershop', barbershopSchema);

module.exports = Barbershop;
