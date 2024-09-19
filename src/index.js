require('dotenv').config();
const PORT = process.env.PORT | 4000;
const express = require('express');
const cors = require('cors');
const db = require('./configs/database.js');
require('./models/assotiation.js');
const app = express();

const verifyJWT = require('./middlewares/verifyJWT.js');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
(async () => {
    await db.sync();
})();
app.use('/', require('./routes/authRoutes.js'));

app.use('/users', verifyJWT, require('./routes/userRoutes.js'));
app.use('/products', verifyJWT, require('./routes/productRoutes.js'));
app.use('/reports', verifyJWT, require('./routes/reportRoutes.js'));

// listen
app.listen(PORT, () => {
    console.log(`Server berhasil running di http://localhost:${PORT}`);
});
