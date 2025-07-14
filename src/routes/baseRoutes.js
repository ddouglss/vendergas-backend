const express = require('express');
const baseRoutes = express.Router();
const usuarioRoutes = require('./usuarioRoutes');
const empresaRoutes = require('./empresaRoutes');
const clienteRoutes = require('./clienteRoutes');
const produtoRoutes = require('./produtoRoutes');
const pedidoRoutes = require('./pedidoRoutes');

baseRoutes.use('/api/usuarios', usuarioRoutes);

baseRoutes.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

baseRoutes.use('/api/usuarios', usuarioRoutes);
baseRoutes.use('/api/empresas', empresaRoutes);
baseRoutes.use('/api/clientes', clienteRoutes);
baseRoutes.use('/api/produtos', produtoRoutes);
baseRoutes.use('/api/pedidos', pedidoRoutes);

baseRoutes.get('/', (req, res) => {
    res.json({
        message: 'API rodando no Docker!',
        endpoints: {
            usuarios: '/api/usuarios',
            empresas: '/api/empresas',
            clientes: '/api/clientes',
            produtos: '/api/produtos',
            pedidos: '/api/pedidos'
        }
    });
});

module.exports = baseRoutes;
