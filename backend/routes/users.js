const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Ban a user by ID
router.put('/:id/ban', authMiddleware, async (req, res) => {
  // Assuming authMiddleware populates req.user with the authenticated user's data
  if (!req.user || req.user.status !== 2) { // Check if the user is an admin; assuming status 2 is for admins
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { isBanned: true } }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User has been banned', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a specific user by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!req.user || req.user.status !== 2) { // Again, checking if the user is an admin
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User has been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Change user status by ID
router.put('/:id/status', authMiddleware, async (req, res) => {
  if (!req.user || req.user.status !== 2) { // Admin check
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { status } = req.body;
  if (status === undefined) {
    return res.status(400).json({ error: 'Status not provided' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User status has been updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;