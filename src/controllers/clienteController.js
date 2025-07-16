const ClienteService = require('../services/clienteService');

exports.create = async (req, res) => {
    const { nome, email, telefone, endereco, empresa: empresaEnviada } = req.body;
    const { role, empresaId: empresaDoUsuario, id: userId } = req.user;

    let empresaFinal;

    if (role === 'user') {
        empresaFinal = empresaDoUsuario;
    } else if (role === 'admin' || role === 'superadmin') {
        if (!empresaEnviada) {
            return res.status(400).json({ success: false, error: 'ID da empresa é obrigatório.' });
        }

        if (typeof empresaEnviada !== 'string' || empresaEnviada.length !== 24) {
            return res.status(400).json({ success: false, error: 'ID de empresa inválido.' });
        }

        empresaFinal = empresaEnviada;
    } else {
        return res.status(403).json({ success: false, error: 'Permissão insuficiente.' });
    }

    try {
        const cliente = await ClienteService.create({
            nome,
            email,
            telefone,
            endereco,
            empresa: empresaFinal
        });

        res.status(201).json({ success: true, data: cliente });
    } catch (err) {
        console.error('[ClienteController] Erro ao criar cliente:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }

};

exports.getByEmpresa = async (req, res) => {
    try {
        const { empresaId } = req.params;
        const clientes = await ClienteService.getByEmpresa(empresaId);
        res.status(200).json({ success: true, data: clientes });
    } catch (err) {
        console.error('[ClienteController] Erro ao buscar clientes da empresa:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, cliente } = await ClienteService.updateCliente(id, req.body);

        res.status(200).json({
            success: true,
            message,
            cliente
        });
    } catch (err) {
        console.error('[ClienteController] Erro ao atualizar cliente:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, deletedId } = await ClienteService.deleteCliente(id);

        res.status(200).json({
            success: true,
            message,
            deletedId
        });
    } catch (err) {
        console.error('[ClienteController] Erro ao deletar cliente:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};

