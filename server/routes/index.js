const express = require('express');
const generalRoutes = require('./general');
const clientRoutes = require('./client');

const router = express.Router();

router.use('/general', generalRoutes);
router.use('/client', clientRoutes);

module.exports = router;
