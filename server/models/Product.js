/* eslint-disable comma-dangle */
const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    },
    { timestamps: true }
);
const Product = model('Product', ProductSchema);
module.exports = Product;
