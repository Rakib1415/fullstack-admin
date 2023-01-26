const { Schema, model, Types } = require('mongoose');

const TransactionSchema = new Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [Types.ObjectId],
            of: Number,
        },
    },
    { timestamps: true }
);

const Transaction = model('Transaction', TransactionSchema);
module.exports = Transaction;
