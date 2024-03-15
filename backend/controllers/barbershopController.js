const Barbershop = require('../models/Barbershop');

exports.getAllBarbershops = async (req, res) => {
  try {
    const barbershops = await Barbershop.find();
    res.json(barbershops);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBarbershopById = async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBarbershopProfessionals = async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop.professionals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBarbershop = async (req, res) => {
  try {
    const { name, street, professionals, adminUsername } = req.body;
    if (req.user.status === 1) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
    const barbershop = new Barbershop({
      name,
      street,
      professionals,
      adminUsername: req.user.username, // Use the username from the authenticated user
    });
    await barbershop.save();
    res.status(201).json(barbershop);
  } catch (error) {
    res.status(400).json({ error: 'Invalid barbershop data' });
  }
};