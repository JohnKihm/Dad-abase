const router = require('express').Router();
const { DadJokes } = require('../models');

router.get('/', async (req, res) => {
    try {
        const joke = await DadJokes.findOne({
            //make jokesSeen excluded 
        });
        res.render('joke', { 
            joke, 
          });
    } catch {
        res.status(500).json(err);
    }
});

module.exports = router;
