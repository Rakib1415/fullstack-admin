/* eslint-disable object-curly-newline */

const getCountryISO3 = require('country-iso-2-to-3');
const Product = require('../models/Product');
const ProductStat = require('../models/ProductStat');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const error = require('../utils/error');

const getProducts = async (_req, res, next) => {
    try {
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    stat,
                    ...product._doc,
                };
            }),
        );
        return res.status(200).json(productsWithStats);
    } catch (err) {
        next(err);
    }
};

const getCustomers = async (_req, res, next) => {
    try {
        const customers = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
};

const getTransactions = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort === 'ASC' ? 1 : -1,
            };
            return sortFormatted;
        };
        const sortFormatted = sort ? generateSort() : {};
        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, 'i') } },
                { userId: { $regex: new RegExp(search, 'i') } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $option: 'i' },
        });

        res.status(200).json({
            total,
            transactions,
        });
    } catch (err) {
        next(err);
    }
};

const getGeography = async (req, res, next) => {
    try {
        const users = await User.find();
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryISO3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3] += 1;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => ({
            id: country,
            value: count,
        }));

        return res.status(200).json(formattedLocations);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography,
};
