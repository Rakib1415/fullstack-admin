const express = require('express');
const generalRoutes = require('./general');
const clientRoutes = require('./client');
const salesRoutes = require('./sales');
const managementRoutes = require('./management');

const router = express.Router();

router.use('/general', generalRoutes);
router.use('/client', clientRoutes);
router.use('/sales', salesRoutes);
router.use('/management', managementRoutes);

module.exports = router;
