const express = require('express');
const baseRoutes = express.Router();

baseRoutes.get('/health', (req, res) => {
    const dbStatus = req.db.readyState === 1 ? 'Conectado' : 'Desconectado';

    res.status(200).json({
        status: 'UP',
        database: dbStatus,
        container: process.env.HOSTNAME || 'local',
        timestamp: new Date().toISOString()
    });
});

baseRoutes.get('/', (req, res) => {
    res.json({
        message: 'API rodando no Docker!',
        endpoints: {
            auth: '/api/auth',
            users: '/api/usuarios',
            empresas: '/api/empresas',
            produtos: '/api/produtos',
            clientes: '/api/clientes',
            pedidos: '/api/pedidos',
            health: '/health',
        }
    });
});

module.exports = baseRoutes;