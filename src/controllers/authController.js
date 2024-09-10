const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username dan password wajib ada' });
    }

    const userFound = await User.findOne({ where: { username } });
    if (!userFound) {
        return res
            .status(401)
            .json({ message: 'Username atau password salah' });
    }
    const validation = await bcrypt.compare(password, userFound.password);
    if (validation) {
        res.json({ message: 'Berhasil login' });
    } else {
        res.status(401).json({ message: 'Username atau password salah' });
    }
};

module.exports = handleLogin;
