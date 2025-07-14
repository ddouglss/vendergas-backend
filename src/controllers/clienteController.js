const ClienteService = require('src/services/clienteService');

exports.create = async (req, res) => {
    try {
        const cliente = await ClienteService.create(req.body);
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

