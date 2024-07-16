const router = require('express').Router();
const sequelize = require('../config/connection');
const { DadJoke, Rating } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/joke', async (req, res) => {
    try {    
        const jokesLen = await DadJoke.count();
        let joke;
        let randomJoke = await sequelize.query('SELECT id FROM dadjoke ORDER BY RANDOM() LIMIT 1');
        let jokeID = randomJoke[0][0].id;

        // Prevent logged in users from seeing the same jokes over and over
        if (req.session.logged_in) {
            // If the user has seen every joke, display message and hide all rating-related elements
            if (req.session.jokesSeen.length === jokesLen) {
                joke = { 
                    joke: 'No more jokes! You have seen them all! Come back later!',
                    avgRating: null
                };
                res.render('joke', {
                    ...joke,
                    logged_in: req.session.logged_in
                });
            } else {
                // Get random id of a joke that the user has not already seen this session
                while (req.session.jokesSeen.includes(jokeID)) {
                    randomJoke = await sequelize.query('SELECT id FROM dadjoke ORDER BY RANDOM() LIMIT 1');
                    jokeID = randomJoke[0][0].id;
                }
                req.session.save(() => {
                    req.session.jokesSeen.push(jokeID);
                });
            }
        }

        const jokeData = await DadJoke.findOne({
            where: { id: jokeID},
            include: [Rating]
        });
        joke = jokeData.get({ plain: true });
        const ratingsLen = joke.ratings.length;
        if (ratingsLen) {
            let sum = 0;
            for (rating of joke.ratings) {
                sum += rating.value;
            }
            joke.avgRating = Math.floor((sum/ratingsLen)*10)/10;
        } else {
            joke.avgRating = 'Not yet rated'
        }

        res.render('joke', {
            ...joke,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/addjoke', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('newjoke', {
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/editjoke/:id', async (req, res) => {
    const jokeData = await DadJoke.findOne({
        where: { id: req.params.id},
    });
    const joke = jokeData.get({ plain: true });
    try {
        if (req.session.logged_in) {
            res.render('editjoke', {
                joke,
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
        }

        res.render('signup', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
