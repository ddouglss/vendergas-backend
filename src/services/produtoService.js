const Produto = require('../models/produto');

class ProdutoService {
    async create(data) {
        const produto = new Produto(data);
        return await produto.save();
    }

    async getByEmpresa(empresaId) {
        return await Produto.find({ empresa: empresaId });
    }

    async getAllProduto(produtoId) {
        return await Produto.find({prroduto: produtoId})
    }

    async updateProduto(id, data) {
        console.log('Tentando atualizar produto:', id, data);
        const produto = await Produto.findByIdAndUpdate(id, data, { new: true });
        if (!produto) {
            console.error('Produto não encontrado no banco!');
            throw new Error('Produto não encontrado');
        }
        return { message: 'Produto atualizado com sucesso', produto };
    }


    async deleteProduto(id) {
        const result = await Produto.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Produto não encontrado ou já removido');
        }
        return { message: 'Produto deletado com sucesso', deletedId: id };
    }
}

module.exports = new ProdutoService();
