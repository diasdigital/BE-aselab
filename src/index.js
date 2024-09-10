require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT | 4000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/register', require('./routes/registerRoutes.js'));
app.use('/login', require('./routes/loginRoutes.js'));
app.use('/users', require('./routes/userRoutes.js'));
app.use('/products', require('./routes/productRoutes.js'));

app.listen(PORT, () => {
    console.log(`Server berhasil running di http://localhost:${PORT}`);
});
