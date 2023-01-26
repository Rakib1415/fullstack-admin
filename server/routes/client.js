const router = require('express').Router();
const { getProducts } = require('../controllers/client');

router.get('/products', getProducts);
module.exports = router;
