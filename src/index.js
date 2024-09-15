require('dotenv').config();
const PORT = process.env.PORT | 4000;
const express = require('express');
const cors = require('cors');
const app = express();

const verifyJWT = require('./middlewares/verifyJWT.js');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/register', require('./routes/registerRoutes.js'));
app.use('/login', require('./routes/authRoutes.js'));
app.use('/refresh', require('./routes/refreshRoutes.js'));
app.use('/logout', require('./routes/logoutRoutes.js'));

app.use('/users', verifyJWT, require('./routes/userRoutes.js'));
app.use('/products', verifyJWT, require('./routes/productRoutes.js'));

// listen
app.listen(PORT, () => {
    console.log(`Server berhasil running di http://localhost:${PORT}`);
});
