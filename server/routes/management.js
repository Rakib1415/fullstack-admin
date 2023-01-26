const router = require('express').Router();
const { getAdmins, getUserPerformance } = require('../controllers/management');

router.use('/admins', getAdmins);

router.use('/performance/:id', getUserPerformance);

module.exports = router;
