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
        let jokeID = Math.floor(Math.random() * jokesLen);
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

module.exports = router;
