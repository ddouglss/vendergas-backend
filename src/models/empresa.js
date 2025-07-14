const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nomeFantasia: { type: String, required: true },
    razaoSocial: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('empresa', EmpresaSchema);
