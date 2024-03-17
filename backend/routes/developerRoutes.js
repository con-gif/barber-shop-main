// backend/routes/developerRoutes.js
const express = require('express');
const { getAllUsers, banUser, deleteUser, changeUserStatus, unbanUser } = require('../controllers/developerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id/ban', authMiddleware, banUser);
router.delete('/users/:id', authMiddleware, deleteUser);
router.put('/users/:id/status', authMiddleware, changeUserStatus);
router.put('/users/:id/unban', authMiddleware, unbanUser);

console.log({ banUser, deleteUser, changeUserStatus });

module.exports = router;
