const express = require('express');
const router = express.Router();
const Barbershop = require('../models/Barbershop');
const authMiddleware = require('../middleware/authMiddleware');
const barbershopController = require('../controllers/barbershopController');

router.get('/', barbershopController.getAllBarbershops);
router.get('/:id', barbershopController.getBarbershopById);
router.get('/:id/professionals', barbershopController.getBarbershopProfessionals);
router.post('/', authMiddleware, barbershopController.createBarbershop);
router.delete('/:id', authMiddleware, barbershopController.deleteBarbershop);

module.exports = router;