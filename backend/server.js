import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));