const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const User = db.define(
    'users',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        birthyear: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        office_address: DataTypes.STRING,
        img: DataTypes.STRING,
        refresh_token: DataTypes.STRING,
        verified: DataTypes.BOOLEAN,
    },
    {
        freezeTableName: true,
    }
);

module.exports = User;
