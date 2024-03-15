const express = require('express');
const router = express.Router();
const Barbershop = require('../models/Barbershop');
const authMiddleware = require('../middleware/authMiddleware');
const barbershopController = require('../controllers/barbershopController');

// GET all barbershops
router.get('/', barbershopController.getAllBarbershops);

// GET a specific barbershop by ID
router.get('/:id', barbershopController.getBarbershopById);

// GET professionals for a specific barbershop
router.get('/:id/professionals', barbershopController.getBarbershopProfessionals);

// POST a new barbershop
router.post('/', authMiddleware, barbershopController.createBarbershop);

module.exports = router;