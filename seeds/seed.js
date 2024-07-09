const sequelize = require('../config/connection');
const { DadJokes } = require('../models');

const dadJokeData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const joke of dadJokeData) {
    await DadJokes.create({
      ...joke,
    });
  }

  process.exit(0);
};

seedDatabase();
