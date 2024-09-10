const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username dan password wajib ada' });
    }

    const duplicate = await User.findOne({ where: { username } });
    if (duplicate)
        return res.status(409).json({ message: 'Username sudah terdaftar' });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPwd };
        await User.create(newUser);
        res.status(201).json({ message: 'user berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = handleRegister;
