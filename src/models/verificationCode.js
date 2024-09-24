const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');
const User = require('./user.js');

const { DataTypes } = Sequelize;

const VerificationCode = db.define(
    'verification_code',
    {
        verif_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        otp: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'user_id',
            },
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = VerificationCode;
