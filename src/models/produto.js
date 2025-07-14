const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    descricao: { type: String },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Produto', ProdutoSchema);
