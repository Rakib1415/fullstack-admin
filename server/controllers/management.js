const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getAdmins = async (req, res, next) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        return res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
};

const getUserPerformance = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userWithstats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'affiliatestats',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'affiliateStats',
                },
            },
            { $unwind: '$affiliateStats' },
        ]);

        const { affiliateSales } = userWithstats[0].affiliateStats;

        const saleTransactions = await Promise.all(
            affiliateSales.map((affiliateId) => Transaction.findById(affiliateId))
        );

        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null,
        );

        res.status(200).json({ user: userWithstats[0], sales: filteredSaleTransactions });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAdmins,
    getUserPerformance,
};
