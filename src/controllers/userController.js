const User = require('../models/user.js');

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
        await User.update(req.body, {
            where: {
                user_id: req.user_id,
            },
        });
        res.status(200).json({ message: 'User Updated' });
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
