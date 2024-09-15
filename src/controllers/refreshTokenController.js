const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    const refreshToken = cookies.jwt;

    const userFound = await User.findOne({ where: { refreshToken } });
    if (!userFound) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || userFound.id !== decoded.id) {
                return res.status(403).json({
                    message: 'Token verification failed or user mismatch',
                });
            }
            const accessToken = jwt.sign(
                { userId: decoded.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ accessToken });
        }
    );
};

module.exports = handleRefreshToken;
