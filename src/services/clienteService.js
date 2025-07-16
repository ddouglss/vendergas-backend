const Cliente = require('../models/cliente');
const Empresa = require("../models/empresa");

class ClienteService {

    async create(data) {
        const cliente = new Cliente(data);
        return await cliente.save();
    }

    async getByEmpresa(empresaId) {
        return await Cliente.find({ empresa: empresaId });
    }

    async getAllByClient(userId) {
        return await Cliente.find({ usuario: userId });
    }

    async updateCliente(id, data) {
        const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }
        return {
            message: 'Cliente atualizado com sucesso',
            cliente
        };
    }

    async deleteCliente(id) {
        const result = await Cliente.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Cliente não encontrado ou já removido');
        }
        return {
            message: 'Cliente deletado com sucesso',
            deletedId: id
        };
    }
}

module.exports = new ClienteService();
