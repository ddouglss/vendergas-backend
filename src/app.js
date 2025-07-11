require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRoutes = require('./routes/baseRoutes');

const createApp = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    const dbConnection = await connectDB();

    app.use((req, res, next) => {
        req.db = dbConnection;
        next();
    });

    app.use('/', baseRoutes);

    app.use((err, req, res, next) => {
        console.error(`[${new Date().toISOString()}] Erro:`, err.stack);
        res.status(500).json({
            error: 'Erro interno no servidor',
            timestamp: new Date().toISOString()
        });
    });

    return app;
};

module.exports = createApp;
