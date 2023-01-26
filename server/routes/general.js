const express = require('express');
const { getUser } = require('../controllers/general');

const router = express.Router();

router.get('/user/:id', getUser);
router.get('/dashboard', (req, res) => {
    res.status(200).json({ message: 'Hello Dashboard!' });
});
module.exports = router;
