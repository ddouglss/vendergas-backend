const PedidoService = require('src/services/pedidoService');

exports.create = async (req, res) => {
    try {
        const pedido = await PedidoService.create(req.body);
        res.status(201).json({ success: true, data: pedido });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getByEmpresa = async (req, res) => {
    try {
        const pedidos = await PedidoService.getByEmpresa(req.params.empresaId);
        res.status(200).json({ success: true, data: pedidos });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, pedido } = await PedidoService.updatePedido(id, req.body);

        res.status(200).json({
            success: true,
            message,
            pedido
        });
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, deletedId } = await PedidoService.deletePedido(id);
        res.status(200).json({
            success: true,
            message,
            deletedId
        });
    } catch (err) {
        console.error('Erro ao deletar pedido:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};
