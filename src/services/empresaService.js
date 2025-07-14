const Empresa = require('../models/empresa');
const Cliente = require('../models/cliente');
const Produto = require('../models/produto');
const Pedido = require('../models/pedido');

class EmpresaService {
    async create(data, userId) {
        const empresa = new Empresa({ ...data, usuario: userId });
        return await empresa.save();
    }

    async getAllByUser(userId) {
        return await Empresa.find({ usuario: userId });
    }

    async updateEmpresa(id, data) {
        const empresa = await Empresa.findByIdAndUpdate(id, data, { new: true });
        if (!empresa) {
            throw new Error('Empresa não encontrada');
        }
        return { message: 'Empresa atualizada com sucesso', empresa };
    }

    async deleteEmpresaSimples(id) {
        const result = await Empresa.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Empresa não encontrada ou já removida');
        }
        return { message: 'Empresa deletada com sucesso', deletedId: id };
    }

    async deleteEmpresaComRelacionados(id) {
        await Cliente.deleteMany({ empresa: id });
        await Produto.deleteMany({ empresa: id });
        await Pedido.deleteMany({ empresa: id });

        const result = await Empresa.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Empresa não encontrada ou já removida');
        }
        return { message: 'Empresa e dados relacionados deletados com sucesso', deletedId: id };
    }

    async deleteEmpresa(id, cascade = false) {
        if (cascade) {
            return await this.deleteEmpresaComRelacionados(id);
        } else {
            return await this.deleteEmpresaSimples(id);
        }
    }
}

module.exports = new EmpresaService();

