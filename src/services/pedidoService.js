const Pedido = require('src/models/pedido');

class PedidoService {
    async create(data) {
        const pedido = new Pedido(data);
        return await pedido.save();
    }

    async getByEmpresa(empresaId) {
        return await Pedido.find({ empresa: empresaId })
            .populate('cliente')
            .populate('empresa')
            .populate('produtos.produto');
    }

    async updatePedido(pedidoId, data) {
        const pedido = await Pedido.findByIdAndUpdate(pedidoId, data, { new: true });
        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }
        return {
            message: 'Pedido atualizado com sucesso',
            pedido
        };
    }

    async deletePedido(id) {
        const pedido = await Pedido.deleteOne({ _id: id });
        if (pedido.deletedCount === 0) {
            throw new Error('Pedido não encontrado ou já removido');
        }
        return {
            message: 'Pedido deletado com sucesso',
            deletedId: id
        };
    }
}

module.exports = new PedidoService();
