const router = require('express').Router();
const { DadJoke } = require('../../models');

router.post('/newjoke', async (req, res) => {
    try {
        const newDadJoke = await DadJoke.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newDadJoke);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedDadJoke = await DadJoke.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(updatedDadJoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedDadJoke = await DadJoke.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedDadJoke) {
            res.status(404).json({ message: 'No joke found with this id!' });
            return;
        }

        res.status(200).json(deletedDadJoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
