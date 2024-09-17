const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');
const User = require('./user.js');

const { DataTypes } = Sequelize;

const Product = db.define(
    'products',
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        sold: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        product_code: DataTypes.STRING,
        location: DataTypes.STRING,
        description: DataTypes.TEXT,
        img1: DataTypes.STRING,
        img2: DataTypes.STRING,
        img3: DataTypes.STRING,
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

module.exports = Product;
