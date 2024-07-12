const router = require('express').Router();
const { DadJoke } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
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
            where: { id: jokeID}
            //exclude joke already seen
        });

        const joke = jokeData.get({ plain: true });
        

        res.render('joke', {
            ...joke
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/addjoke', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('newjoke');
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

        res.render('login');
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

        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
