const User = require('./User');
const DadJoke = require('./DadJoke');
const Category = require('./Category');

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

module.exports = { User, DadJoke, Category };