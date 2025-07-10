const express = require('express');
const baseRoutes = express.Router();

baseRoutes.get('/health', (req, res) => {
    const dbStatus = req.db.readyState === 1 ? 'Conectado' : 'Desconectado';
    res.status(200).json({
        status: 'UP',
        database: dbStatus,
        container: process.env.HOSTNAME || 'local'
    });
});

baseRoutes.get('/', (req, res) => {
    res.json({
        message: 'API rodando no Docker!',
        endpoints: {
            auth: '/api/auth',
            health: '/health'
        }
    });
});

module.exports = baseRoutes;