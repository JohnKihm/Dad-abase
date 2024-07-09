const router = require('express').Router();
const { DadJoke } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('joke');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
