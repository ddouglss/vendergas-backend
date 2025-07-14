require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const baseRoutes = require('./src/routes/baseRoutes');

const createApp = async () => {
    const app = express();


    app.use(cors({
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    ));
    app.use(express.json());

    const db = await connectDB();

    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    app.use('/', baseRoutes);

    return app;
};

module.exports = createApp;