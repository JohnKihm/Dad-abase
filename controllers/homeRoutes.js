const router = require('express').Router();
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


async function getJokesLen() {
    const allJokeData = await DadJoke.findAll({});
    const jokes = allJokeData.map((joke) => joke.get({ plain: true }));

    return jokes.length;
};

router.get('/joke', async (req, res) => {
    try {    
        let jokesLen = await getJokesLen();
        //console.log(jokesLen);
        //console.log(Math.floor(Math.random() * jokesLen));
        let jokeID = Math.floor((Math.random() * jokesLen) + 1);
        const jokeData = await DadJoke.findOne({
            where: { id: jokeID},
            //exclude joke already seen
            include: [Rating]
        });

        const joke = jokeData.get({ plain: true });

        const ratingsLen = joke.ratings.length;
        if (ratingsLen) {
            let sum = 0;
            for (rating of joke.ratings) {
                sum += rating.value;
            }
            console.log(sum)
            joke.avgRating = Math.floor((sum/ratingsLen)*10)/10;
        } else {
            joke.avgRating = 'Not yet rated'
        }

        
        console.log(joke)

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
