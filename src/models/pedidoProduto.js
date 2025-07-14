const mongoose = require('mongoose');

const PedidoProdutoSchema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
});

module.exports = PedidoProdutoSchema;
