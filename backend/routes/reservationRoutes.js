const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reservationController = require('../controllers/reservationController');

// Apply authMiddleware globally to all routes in this router
router.use(authMiddleware);

// GET all reservations - secured for admin use
router.get('/', reservationController.getAllReservations);

// Get bookings by the authenticated user's username
router.get('/user', reservationController.getUserReservations);

// POST a new reservation using the authenticated user's username
router.post('/', reservationController.createReservation);

// Confirm a booking by ID, secured for the user who made the booking
router.put('/:id/confirm', reservationController.confirmReservation);

module.exports = router;