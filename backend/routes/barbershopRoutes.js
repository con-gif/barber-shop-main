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


router.post('/add-professional', authMiddleware, barbershopController.addProfessional);
router.post('/remove-professional', authMiddleware, barbershopController.removeProfessional);
router.get('/my-barbershop/professionals', authMiddleware, barbershopController.getBarbershopProfessionalsByAdmin);
router.post('/my-barbershop/add-professional', authMiddleware, barbershopController.addProfessionalByAdmin);

module.exports = router;