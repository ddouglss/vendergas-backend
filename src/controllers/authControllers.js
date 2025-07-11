const Usuario = require('../models/Usuario');

exports.cadastrar = async (req, res) => {
    try {
        const {nome, email, password} =  req.body;
        const existirUsuario = await Usuario.findOne({ email });
        if (existirUsuario) {
            return res.status(400).json({success: false, error: 'Email já cadastrado'});
        }
        const usuario = await Usuario.create({ nome, email, password});
        const token = usuario.generateAuthToken();
        res.status(201).json({success: true, token});
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuario.findOne({ email }).select('+password');
        if (!usuario || !(await usuario.comparePassword(password))) {
            return res.status(401).json({error: 'Credenciais inválidas'});
        }
        const token = usuario.generateAuthToken();
        res.json({ success: true, token});
    } catch (err) {
        res.status(500).json({error: 'Erro ao fazer login'});
    }
};