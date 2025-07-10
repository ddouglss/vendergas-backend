const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
        maxlength: [50, 'Nome não pode ter mais que 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Adicione um email válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [6, 'A senha precisa ter pelo menos 6 caracteres'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );
};

module.exports = mongoose.model('User', UserSchema);
