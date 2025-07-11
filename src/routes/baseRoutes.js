const express = require('express');
const baseRoutes = express.Router();
const usuarioRoutes = require('./usuarioRoutes');

baseRoutes.use('api/usuarios', usuarioRoutes);

baseRoutes.get('/health', (req, res) => {
    res.send(200).json({status: 'Ok', timestamp: new Date().toISOString() });
});

baseRoutes.get('/', (req, res) => {
    res.json({ message: 'API rodando com sucesso!' });
});

module.exports = baseRoutes;
