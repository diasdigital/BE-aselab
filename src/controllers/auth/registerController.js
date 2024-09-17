const User = require('../../models/user.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res
            .status(400)
            .json({ message: 'Data tidak lengkap wajib ada' });
    }

    const duplicate = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
    });
    if (duplicate)
        return res
            .status(409)
            .json({ message: 'Username atau email sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { email, username, password: hashedPwd };
        await User.create(newUser);
        res.status(201).json({ message: 'User berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
