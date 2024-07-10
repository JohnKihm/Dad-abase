const router = require('express').Router();

const userRoutes = require('./userRoutes');
const jokeRoutes = require('./jokeRoutes');
const ratingRoutes = require('./ratingRoutes');

router.use('/users', userRoutes);
router.use('/jokes', jokeRoutes);
router.use('ratings', ratingRoutes);

module.exports = router;
