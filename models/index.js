const User = require('./User');
const DadJoke = require('./DadJoke');
const Category = require('./Category');
const Rating = require('./Rating');

User.hasMany(DadJoke, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

DadJoke.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.hasMany(DadJoke, {
    foreignKey: 'category_id'
});

DadJoke.belongsTo(Category, {
    foreignKey: 'category_id'
});

DadJoke.hasMany(Rating, {
    foreignKey: 'joke_id',
    onDelete: 'CASCADE'
});

Rating.belongsTo(DadJoke, {
    foreignKey: 'joke_id'
});

module.exports = { User, DadJoke, Category, Rating };