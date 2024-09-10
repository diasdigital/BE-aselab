const Product = require('../models/product.js');
const upload = require('../middlewares/multer.js').single('img');

const getAllProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

const createProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res
                    .status(413)
                    .json({ message: 'File terlalu besar. Max 3MB' });
            }

            const product = await Product.build(req.body);
            product.img = req.file.buffer;
            product.save();
            res.status(201).json({ message: 'Product berhasil dibuat' });
        });
    } catch (error) {
        console.log(error.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        await Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Product berhasil diupdate' });
    } catch (error) {
        console.log(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: 'Product berhasil dihapus' });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
