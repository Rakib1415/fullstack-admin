const { Schema, model, Types } = require('mongoose');

const AffiliateStatSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
        affiliateSales: {
            type: [Types.ObjectId],
            ref: 'Transaction',
        },
    },
    { timestamps: true }
);

const AffiliateStat = model('AffiliateStat', AffiliateStatSchema);
module.exports = AffiliateStat;
