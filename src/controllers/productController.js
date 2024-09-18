const Product = require('../models/product.js');
const upload = require('../middlewares/multer.js').array('img', 3);

// const getAllProducts = async (req, res) => {
//     try {
//         const response = await Product.findAll();
//         res.json({
//             message: 'Data semua produk berhasil diambil',
//             data: response,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message, data: null });
//     }
// };

const getProductByUser = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                user_id: req.user_id,
            },
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
            res.status(201).json({ message: 'Product berhasil dibuat' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const updateProduct = async (req, res) => {
    try {
        const response = await Product.update(req.body, {
            where: {
                product_id: req.params.product_id,
            },
        });
        res.json({ message: 'Data produk berhasil diubah' });
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
