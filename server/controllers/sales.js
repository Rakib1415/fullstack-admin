const OverallStat = require('../models/OverallStat');

const getSales = async (req, res, next) => {
    try {
        const overallStats = await OverallStat.find();
        return res.status(200).json(overallStats[0]);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getSales,
};
