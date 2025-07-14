const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String },
    telefone: { type: String },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', ClienteSchema);
