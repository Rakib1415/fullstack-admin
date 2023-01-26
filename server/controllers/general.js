/* eslint-disable consistent-return */
const User = require('../models/User');
const error = require('../utils/error');

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw error('User not found!', 401);
        }
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUser,
};
