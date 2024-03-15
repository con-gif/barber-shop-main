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
    const barbershops = await Barbershop.find({ adminUsername });
    const barbershopIds = barbershops.map((barbershop) => barbershop._id);
    const bookings = await Reservation.find({ barbershop: { $in: barbershopIds } }).populate('barbershop', 'name');
    const bookingsWithUsername = bookings.map((booking) => ({
      ...booking.toObject(),
      barbershopName: booking.barbershop.name,
      username: booking.username,
    }));
    res.json(bookingsWithUsername);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Confirm a booking
router.put('/:id/confirm', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Confirming reservation with ID:', id);

    const booking = await Reservation.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    console.log('Booking before update:', booking);

    booking.status = 'confirmed';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;