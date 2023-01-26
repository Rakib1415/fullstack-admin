const router = require('express').Router();
const { getAdmins } = require('../controllers/management');

router.use('/admins', getAdmins);

router.use('/performance/:id', (req, res) => {
    res.status(200).json({ message: 'success' });
});

module.exports = router;
