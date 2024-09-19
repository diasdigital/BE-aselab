const Product = require('../models/product.js');
const Report = require('../models/report.js');
const upload = require('../middlewares/multer.js').array('img', 3);

const getProductByUser = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                user_id: req.user_id,
            },
            attributes: [
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
            ],
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

            const product = await Product.build(req.body);
            product.user_id = req.user_id;

            product.sold = 0;

            product.img1 = req.files[0]?.filename;
            product.img2 = req.files[1]?.filename;
            product.img3 = req.files[2]?.filename;

            await product.save();
            await Report.create({
                product_id: product.product_id,
                stock_in: product.quantity,
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
            where: { product_id: req.body.product_id },
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
            report.product_id = req.body.product_id;
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
                    product_id: req.body.product_id,
                },
            }
        );
        res.json({ message: 'Data produk berhasil diubah. Laporan ditambah' });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    // getAllProducts,
    getProductByUser,
    createProduct,
    updateProduct,
};
