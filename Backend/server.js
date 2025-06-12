const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/db');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes')

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expire',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter)

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});