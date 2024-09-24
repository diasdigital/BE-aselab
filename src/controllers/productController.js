const { Op } = require('sequelize');
const Product = require('../models/product.js');
const Report = require('../models/report.js');
const upload = require('../middlewares/multer.js').array('img', 3);
const attributes = [
    'product_id',
    'name',
    'category',
    'quantity',
    'sold',
    'price',
    'product_code',
    'location',
    'description',
    'img1',
    'img2',
    'img3',
];

const getProductByCode = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                [Op.and]: [
                    { product_code: req.params.product_code },
                    { user_id: req.user_id },
                ],
            },
            attributes,
        });
        res.json({
            message: 'Data produk berhasil diambil',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const getProductByUser = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                user_id: req.user_id,
            },
            attributes,
        });
        res.json({
            message: 'Data produk berhasil diambil',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const createProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err?.code === 'LIMIT_FILE_SIZE') {
                return res
                    .status(413)
                    .json({ message: 'File terlalu besar. Max 3MB' });
            }

            if (req.body.product_code) {
                const codeFound = await Product.findOne({
                    where: { product_code: req.body.product_code },
                });
                if (codeFound) {
                    return res
                        .status(409)
                        .json({ message: 'Kode produk sudah digunakan' });
                }
            }

            const product = await Product.build(req.body);
            product.user_id = req.user_id;

            product.sold = 0;

            product.img1 = req.files[0]?.filename;
            product.img2 = req.files[1]?.filename;
            product.img3 = req.files[2]?.filename;
            await product.save();

            const obj = new Date();
            const day = obj.getDate();
            const month = obj.getMonth() + 1;
            const year = obj.getFullYear();
            await Report.create({
                product_id: product.product_id,
                stock_in: product.quantity,
                day,
                month,
                year,
            });
            res.status(201).json({ message: 'Product berhasil dibuat' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            price,
            quantity: oldStock,
            sold: oldSold,
        } = await Product.findOne({
            where: { product_id: req.params.product_id },
            attributes: ['price', 'quantity', 'sold'],
        });

        // Membuat report
        const { stock, sold } = req.body;
        if (stock == oldStock && sold == oldSold) {
            return res.json({ message: 'Tidak ada perubahan stock atau sold' });
        } else {
            const report = Report.build();
            if (stock > oldStock) {
                report.stock_in = stock - oldStock;
            } else {
                report.stock_in = 0;
            }
            if (sold > oldSold) {
                report.stock_out = sold - oldSold;
                report.revenue = price * report.stock_out;
            } else {
                report.stock_out = 0;
                report.revenue = 0;
            }

            const obj = new Date();
            report.day = obj.getDate();
            report.month = obj.getMonth() + 1;
            report.year = obj.getFullYear();

            report.product_id = req.params.product_id;
            await report.save();
        }

        // Ubah stock dan sold di product
        await Product.update(
            {
                quantity: stock,
                sold,
            },
            {
                where: {
                    product_id: req.params.product_id,
                },
            }
        );
        res.json({ message: 'Data produk berhasil diubah. Laporan ditambah' });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getProductByCode,
    getProductByUser,
    createProduct,
    updateProduct,
};
