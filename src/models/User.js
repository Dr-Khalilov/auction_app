const bookshelf = require('../utils/database');
const bcrypt = require('bcryptjs');

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,

    roles () {
        return this.belongsToMany('Role');
    },

    refreshTokens () {
        return this.hasMany('RefreshToken');
    },

    transactions () {
        return this.hasMany('Transaction');
    },

    ratings () {
        return this.hasMany('Rating');
    },

    chats () {
        return this.hasMany('Chat');
    },

    auction_items () {
        return this.belongsTo('Auction_Item');
    },

    async findAll (filter, options) {
        return this.forge()
            .where(filter)
            .fetchAll(options);
    },

    async findOne (query, options) {
        return this.forge(query).fetch(options);
    },

    async create (data, options) {
        return this.forge(data).save(null, options);
    },

    async comparePassword (plainPassword) {
        return bcrypt.compare(plainPassword, this.getDataValue('password'));
    },

    async hashPassword (user, options) {
        if (user.changedPassword('password')) {
            const { password } = user;
            const hash = await bcrypt.hash(password, process.env.SALT_ROUNDS);
            user.password = hash;
        }
    },
});

module.exports = User;
