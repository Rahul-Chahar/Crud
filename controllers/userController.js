const User = require('../models/userModel');

// Home route
exports.home = (req, res) => {
    res.send('API is running...');
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'fail',
            message: 'Failed to create user',
            error: error.message,
        });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'fail',
            message: 'Failed to fetch users',
            error: error.message,
        });
    }
};

// Edit user by ID
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'fail',
            message: 'Failed to update user',
            error: error.message,
        });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'fail',
            message: 'Failed to delete user',
            error: error.message,
        });
    }
};
