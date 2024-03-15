const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/auth');

// Apply authMiddleware globally to all routes in this router
router.use(authMiddleware);

// GET all reservations - secured for admin use
router.get('/', async (req, res) => {
    if (![2, 3].includes(req.user.status)) {
        return res.status(403).json({ error: 'Access denied.' });
    }
    const reservations = await Reservation.find();
    res.json(reservations);
});

// Get bookings by the authenticated user's username
router.get('/user', async (req, res) => {
    const bookings = await Reservation.find({ username: req.user.username });
    res.json(bookings);
});

const generateReservationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

// POST a new reservation using the authenticated user's username
router.post('/', async (req, res) => {
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
});

// Confirm a booking by ID, secured for the user who made the booking
router.put('/:id/confirm', async (req, res) => {
    const booking = await Reservation.findById(req.params.id);
    if (!booking || booking.username !== req.user.username) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    booking.status = 'confirmed';
    await booking.save();
    res.json(booking);
});

module.exports = router;
