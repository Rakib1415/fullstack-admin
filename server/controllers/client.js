const Product = require('../models/Product');
const ProductStat = require('../models/ProductStat');

const getProducts = async (req, res, next) => {
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

module.exports = {
    getProducts,
};
