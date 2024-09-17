const { Sequelize } = require('sequelize');
const db = require('../configs/database.js');

const { DataTypes } = Sequelize;

const Product = db.define(
    'products',
    {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        productCode: DataTypes.STRING,
        location: DataTypes.STRING,
        description: DataTypes.TEXT,
        img: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

module.exports = Product;

(async () => {
    await db.sync();
})();
