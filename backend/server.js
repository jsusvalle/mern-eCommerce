import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productsRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes);

app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));