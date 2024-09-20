const { Op, Sequelize } = require('sequelize');
const Product = require('../models/product.js');
const Report = require('../models/report.js');

const getReport = async (req, res) => {
    try {
        const { createdAfter: start, createdBefore: end } = req.query;
        const totalProduct = await Product.findOne({
            where: { user_id: req.user_id },
            attributes: [
                [
                    Sequelize.fn('SUM', Sequelize.col('quantity')),
                    'totalProduct',
                ],
            ],
        });
        const productReports = await Product.findAll({
            where: { user_id: req.user_id },
            attributes: ['name'],
            include: [
                {
                    model: Report,
                    attributes: [
                        'report_id',
                        'stock_in',
                        'stock_out',
                        'revenue',
                        'product_id',
                        'year',
                        'month',
                        'day',
                    ],
                    where: {
                        createdAt: {
                            [Op.between]: [start, end],
                        },
                    },
                },
            ],
        });
        res.status(200).json({
            message: 'Report tiap product berhasil diambil',
            data: {
                totalProduct: totalProduct.dataValues.totalProduct,
                productReports,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getReport,
};
