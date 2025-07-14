const ProdutoService = require('src/services/produtoService');

exports.create = async (req, res) => {
    try {
        const produto = await ProdutoService.create(req.body);
        res.status(201).json({ success: true, data: produto });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getByEmpresa = async (req, res) => {
    try {
        const produtos = await ProdutoService.getByEmpresa(req.params.empresaId);
        res.status(200).json({ success: true, data: produtos });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID do produto:', id);
        console.log('Dados para update:', req.body);

        const { message, produto } = await ProdutoService.updateProduto(id, req.body);

        res.status(200).json({
            success: true,
            message,
            produto
        });
    } catch (err) {
        console.error('Erro ao atualizar produto:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};


exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, deletedId } = await ProdutoService.deleteProduto(id);

        res.status(200).json({
            success: true,
            message,
            deletedId
        });
    } catch (err) {
        console.error('Erro ao deletar produto:', err.message);
        res.status(400).json({ success: false, error: err.message });
    }
};
