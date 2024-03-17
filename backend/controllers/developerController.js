const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


exports.banUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { isBanned: true } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User has been banned', user });
    } catch (error) {
        console.error('Failed to ban user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User has been deleted' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.changeUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { status: status } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User status has been updated', user });
    } catch (error) {
        console.error('Failed to change user status:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.unbanUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { isBanned: false } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User has been unbanned', user });
    } catch (error) {
        console.error('Failed to unban user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};