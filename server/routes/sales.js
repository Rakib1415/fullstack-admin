const router = require('express').Router();
const { getSales } = require('../controllers/sales');

router.use('/', getSales);

module.exports = router;
