const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const User = db.define(
    'users',
    {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        officeAddress: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

module.exports = User;

(async () => {
    await db.sync();
})();
