const User = require('../models/usuarioModel');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email já registrado' });
        }

        const user = await User.create({ name, email, password });

        const token = user.getSignedJwtToken();
        res.status(201).json({ success: true, token });
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ success: false, error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
        }

        const token = user.getSignedJwtToken();

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ success: false, error: 'Erro ao fazer login' });
    }
};
