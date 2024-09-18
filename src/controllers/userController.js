const User = require('../models/user.js');
const upload = require('../middlewares/multer.js').single('img');
const multer = require('multer');

const getUserLoggedIn = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                user_id: req.user_id,
            },
            attributes: ['email', 'username', 'phone_number', 'office_address'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

// const getAllUsers = async (req, res) => {
//     try {
//         const response = await User.findAll({
//             attributes: ['email', 'username', 'phone_number', 'office_address'],
//         });
//         res.status(200).json(response);
//     } catch (error) {
//          res.status(500).json({ message: error.message, data: null });
//     }
// };

// const getUserById = async (req, res) => {
//     try {
//         const response = await User.findOne({
//             where: {
//                 user_id: req.params.user_id,
//             },
//             attributes: ['email', 'username', 'phone_number', 'office_address'],
//         });
//         res.status(200).json(response);
//     } catch (error) {
//          res.status(500).json({ message: error.message, data: null });
//     }
// };

const updateUser = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (req.fileValidationError) {
                return res
                    .status(400)
                    .json({ message: req.fileValidationError });
            }
            if (err?.code === 'LIMIT_FILE_SIZE') {
                return res
                    .status(413)
                    .json({ message: 'File terlalu besar. Max 3MB' });
            }

            // masukin filename kalo ada file yang diupload
            req.body.img = req.file?.filename;
            await User.update(req.body, {
                where: {
                    user_id: req.user_id,
                },
            });
            res.status(200).json({ message: 'User Updated' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

module.exports = {
    getUserLoggedIn,
    // getAllUsers,
    // getUserById,
    updateUser,
};
