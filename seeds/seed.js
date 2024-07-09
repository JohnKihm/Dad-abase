const sequelize = require('../config/connection');
const { DadJoke } = require('../models');

const dadJokeData = require('./dadJokes.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const joke of dadJokeData) {
    await DadJoke.create({
      ...joke,
    });
  }

  process.exit(0);
};

seedDatabase();
