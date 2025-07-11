const bcrypt = require('bcrypt');
const User = require('../models/usuarioModel');

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                error: 'Senha não fornecida',
                code: 'MISSING_PASSWORD'
            });
        }

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado',
                code: 'USER_NOT_FOUND'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Senha incorreta',
                code: 'INVALID_PASSWORD'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao verificar senha',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};