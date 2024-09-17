const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');
const Product = require('./product.js');

const { DataTypes } = Sequelize;

const Report = db.define(
    'reports',
    {
        report_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        stockIn: DataTypes.INTEGER,
        stockOut: DataTypes.INTEGER,
        revenue: DataTypes.FLOAT,
        date: DataTypes.DATE,
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'product_id',
            },
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Report;
