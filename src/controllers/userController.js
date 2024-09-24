const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const upload = require('../middlewares/multer.js').single('img');

const getUserLoggedIn = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                user_id: req.user_id,
            },
            attributes: [
                'email',
                'name',
                'birthyear',
                'username',
                'phone_number',
                'office_address',
                'img',
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};

const updateUser = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (req.file) {
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
                req.body.img = req.file.filename;
            }

            if (req.body.newPassword) {
                const { oldPassword, newPassword } = req.body;
                const userFound = await User.findByPk(req.user_id);
                const verifikasi = await bcrypt.compare(
                    oldPassword,
                    userFound.password
                );
                if (!verifikasi) {
                    return res.status(401).json({ message: 'Password salah' });
                }
                const hashedPwd = await bcrypt.hash(newPassword, 10);
                req.body.password = hashedPwd;
            }
            // return res.json({ data: req.body });

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
    updateUser,
};
