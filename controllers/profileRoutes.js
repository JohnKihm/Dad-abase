const router = require('express').Router();
const { DadJoke } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const jokeData = await DadJoke.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const jokes = jokeData.map((joke) => joke.get({ plain: true }));

        res.render('profile', {
            jokes
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
