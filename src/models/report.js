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
        stock_in: { type: DataTypes.INTEGER, defaultValue: 0 },
        stock_out: { type: DataTypes.INTEGER, defaultValue: 0 },
        revenue: { type: DataTypes.FLOAT, defaultValue: 0 },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'product_id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'date',
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Report;
