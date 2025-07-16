const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou mal formatado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'VENDERGAS');
        req.user = {
            id: decoded.id,
            role: decoded.role || 'user',
            email: decoded.email || null,
            nome: decoded.nome || null,
            empresaId: decoded.empresaId || null
        };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = auth;

