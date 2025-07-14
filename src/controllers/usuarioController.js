const usuarioService = require('src/services/usuarioService');

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const result = await usuarioService.updateUserRole(id, role);
        res.status(200).json({ success: true, ...result });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

