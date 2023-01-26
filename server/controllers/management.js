const User = require('../models/User');

const getAdmins = async (req, res, next) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        return res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAdmins,
};
