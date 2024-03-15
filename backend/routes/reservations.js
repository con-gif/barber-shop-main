const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/auth');
const Barbershop = require('../models/Barbershop');

// GET all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get bookings by username
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const bookings = await Reservation.find({ username });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Function to generate a unique reservation code
const generateReservationCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

module.exports = router;

// POST a new reservation
router.post('/', async (req, res) => {
  try {
    console.log('Received reservation data:', req.body);

    // Generate a unique reservation code
    const reservationCode = generateReservationCode();

    const reservation = new Reservation({
      ...req.body,
      reservationCode,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).json({ error: 'Invalid reservation data' });
  }
});

router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const adminUsername = req.user.username;

    // Find the barbershops managed by the admin
    const barbershops = await Barbershop.find({ adminUsername });

    // Extract the barbershop IDs
    const barbershopIds = barbershops.map((barbershop) => barbershop._id);

    // Find the bookings for the admin's managed barbershops
    const bookings = await Reservation.find({ barbershop: { $in: barbershopIds } });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});