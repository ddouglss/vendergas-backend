const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

        const token = user.getSignedJwtToken();
        res.status(201).json({ success: true, token });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = user.getSignedJwtToken();
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
};