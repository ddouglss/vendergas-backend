const mongoose = require('mongoose');
const PedidoProdutoSchema = require('./pedidoProduto');


const PedidoSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
    observacao: { type: String },
    data: { type: Date, default: Date.now },
    produtos: [PedidoProdutoSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema);
