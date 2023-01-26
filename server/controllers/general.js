/* eslint-disable consistent-return */
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const OverallStat = require('../models/OverallStat');
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

const getDashboardStats = async (req, res, next) => {
    try {
        // hardcoded values
        const currentMonth = 'November';
        const currentYear = 2021;
        const currentDay = '2021-11-15';

        /* Recent Transactions */
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        /* Overall Stats */
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(
            ({ month }) => month === currentMonth
        );

        const todayStats = overallStat[0].dailyData.find(({ date }) => date === currentDay);

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUser,
    getDashboardStats,
};
