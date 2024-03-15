const Reservation = require('../models/Reservation');
const generateReservationCode = require('../utils/generateReservationCode');
const Barbershop = require('../models/Barbershop'); // Import the Barbershop model

exports.getAllReservations = async (req, res) => {
  if (![2, 3].includes(req.user.status)) {
    return res.status(403).json({ error: 'Access denied.' });
  }
  const adminUsername = req.user.username;
  const barbershops = await Barbershop.find({ adminUsername });
  const barbershopIds = barbershops.map((barbershop) => barbershop._id);
  const reservations = await Reservation.find({ barbershop: { $in: barbershopIds } }).populate('barbershop', 'name');
  res.json(reservations);
};

exports.getUserReservations = async (req, res) => {
  const bookings = await Reservation.find({ username: req.user.username });
  res.json(bookings);
};

exports.createReservation = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Authentication required' });
  }
  const reservationCode = generateReservationCode();
  const newReservation = new Reservation({
    barbershop: req.body.barbershop,
    date: req.body.date,
    time: req.body.time,
    service: req.body.service,
    professional: req.body.professional,
    status: 'pending', // Default status
    username: req.user.username, // Use the authenticated user's username
    reservationCode,
  });
  try {
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).json({ message: 'Failed to create reservation' });
  }
};

exports.confirmReservation = async (req, res) => {
  const booking = await Reservation.findById(req.params.id);
  if (!booking || booking.username !== req.user.username) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  booking.status = 'confirmed';
  await booking.save();
  res.json(booking);
};