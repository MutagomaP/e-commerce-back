// const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const cartRoutes = require('./routes/cart');
// const orderRoutes = require('./routes/orders');
// const swaggerSetup = require('./swagger');

// require('dotenv').config();

// connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/', userRouter);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// swaggerSetup(app);


mongoose.connect("mongodb://localhost:27017/one").then(()=>{
    console.log('db is connected');
})
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});