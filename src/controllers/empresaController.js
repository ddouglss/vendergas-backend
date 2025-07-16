const EmpresaService = require('../services/empresaService');

exports.create = async (req, res) => {
    try {
        const empresa = await EmpresaService.create(req.body, req.user.id);
        res.status(201).json({ success: true, data: empresa });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const empresas = await EmpresaService.getAllByUser(req.user.id);
        res.status(200).json({ success: true, data: empresas });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getMinhaEmpresa = async (req, res) => {
    try {
        const user = req.user;

        if (!user.empresaId) {
            return res.status(404).json({ success: false, message: 'Usuário não está vinculado a nenhuma empresa.' });
        }

        const empresa = await Empresa.findById(user.empresaId);
        if (!empresa) {
            return res.status(404).json({ success: false, message: 'Empresa não encontrada.' });
        }

        return res.status(200).json([empresa]);
    } catch (err) {
        console.error("Erro ao buscar empresa do usuário:", err);
        return res.status(500).json({ success: false, message: 'Erro interno ao buscar empresa.' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, empresa } = await EmpresaService.updateEmpresa(id, req.body);

        res.status(200).json({
            success: true,
            message,
            empresa
        });
    } catch (err) {
        console.error('Erro ao atualizar empresa:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deleteEmpresaSimples = async (req, res) => {
    try {
        const result = await EmpresaService.deleteEmpresa(req.params.id, false);
        res.status(200).json({ success: true, message: result.message, deletedId: result.deletedId });
    } catch (err) {
        console.error('Erro ao deletar a empresa:', err.message);
        res.status(404).json({ success: false, error: err.message });
    }
};

exports.deleteEmpresaComCascade = async (req, res) => {
    try {
        const result = await EmpresaService.deleteEmpresa(req.params.id, true);
        res.status(200).json({ success: true, message: result.message, deletedId: result.deletedId });
    } catch (err) {
        console.error('Erro ao deletar empresa com cascade:', err.message);
        res.status(404).json({ success: false, error: err.message });
    }
};
