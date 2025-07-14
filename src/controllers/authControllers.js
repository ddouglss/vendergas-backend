const usuarioService = require('src/services/usuarioService');
const User = require('src/models/usuario');

exports.register = async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const { token, user } = await usuarioService.registerUser({ nome, email, password });
        res.status(201).json({ success: true, token, user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await usuarioService.loginUser({ email, password });
        res.status(200).json({ success: true, token, user });
    } catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role === 'user' && req.user.id !== id) {
            return res.status(403).json({ success: false, error: 'Acesso negado' });
        }



        const { message, user } = await usuarioService.updateUser(id, req.body);

        return res.status(200).json({
            success: true,
            message,
            user
        });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err.message);
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role === 'user' && req.user.id !== id) {
            return res.status(403).json({ success: false, error: 'Acesso negado' });
        }

        const { message, deletedId } = await usuarioService.deleteUser(id, false);

        return res.status(200).json({
            success: true,
            message,
            deletedId
        });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err.message);
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.deleteWithCascade = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role === 'user' && req.user.id !== id) {
            return res.status(403).json({ success: false, error: 'Acesso negado' });
        }

        const { message, deletedId } = await usuarioService.deleteUser(id, true);

        return res.status(200).json({
            success: true,
            message,
            deletedId
        });
    } catch (err) {
        console.error('Erro ao deletar com cascade:', err.message);
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (req.user.role === 'user' && req.user.id !== id) {
            return res.status(403).json({ success: false, error: 'Acesso negado' });
        }

        const user = await User.findById(id).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
        }

        if (req.user.role !== 'superadmin') {
            const isMatch = await user.comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(400).json({ success: false, error: 'Senha atual incorreta' });
            }
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

