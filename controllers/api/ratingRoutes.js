const router = require('express').Router();
const { Rating } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log('test')
        const newRating = await Rating.create({
            ...req.body
        });

        res.status(200).json(newRating);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
